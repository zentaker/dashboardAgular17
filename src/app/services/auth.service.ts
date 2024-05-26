import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  initAuthListener(){
    //obtener informacon del usuario 
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
    })


  }

  crearusuario(nombre: string, email: string, password: string){
    console.log({nombre, email, password});
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
    this.auth.signOut().then( ()=> {
      this.router.navigate(['/login'])
    })
  }

  isAuth(){
    //emcargada de regresar un obserbable so esya autenticado
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null))

  }
}
