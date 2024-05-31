import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.action';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //creacion de la subscripcion
  private firestoreSubscription: Subscription = new Subscription();
  private _user: Usuario | null = null;

  get user(){
    return {...this._user};//desestructurin para proteger integridad y no ser cambiado desde afueraa

  }
  

  constructor(
    public auth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    //subscribirse a; obserbable authstate(firebase) para escuchar cambios de estado de autentificacion
    this.auth.authState.subscribe(fuser => {
      //si hay un usuario autentificaco (fuser no es null)
        //console.log('Hay un usuario', fuser);

        if (fuser) {
          // Si existe un usuario autenticado, suscribirse a los cambios del documento del usuario en Firestore.
          this.firestoreSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
            .subscribe(firestoreUser => {
              if (firestoreUser) {
                //console.log('Firestore user:', firestoreUser);
                //convertir el documento de firestore a un obejto Usuario
                const user = Usuario.fromFirebase(firestoreUser);
                
                this._user = user;

                //despachar una accion para establecer el usuario en el store ngrx
                this.store.dispatch(authActions.setUser({ user }));
              }
            });
        } else {
          this._user = null;

          // Si no hay un usuario autenticado (fuser es null).
          console.log('no user found');
          // Despachar una acción para quitar el usuario del store de NgRx.
          this.store.dispatch(authActions.unSetUser());
          // Cancelar la suscripción a Firestore si existe.
          this.firestoreSubscription.unsubscribe(); // Asegúrate de cancelar la suscripción
        }
      });
  }



  crearusuario(nombre: string, email: string, password: string){
    //console.log({nombre, email, password});
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then(({ user }) => {
      if (user) { // Verificar que user no es null

        //instancia de clase###
        const newUser = new Usuario(user.uid, nombre, user.email ?? ''); // Manejar el caso donde email puede ser null

        //firebase no acepta instancias de clase###
        return this.firestore.doc(`${user.uid}/usuario`).set({...newUser})//regresa una promesa
      } else {
        return Promise.reject('user is null')
      }
    })
    .catch(error => {
      console.error('Error al crear el usuario:', error);
    });


  }
  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout(){
    //cancela la subcripcion al obserbable authstate(firebase)
    this.auth.signOut().then( ()=> {
      console.log('logout');
      this.router.navigate(['/login'])
    })
  }

  isAuth(){
    //emcargada de regresar un obserbable so esya autenticado
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null))

  }
}
