import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearusuario(nombre: string, email: string, password: string){
    console.log({nombre, email, password});
    return this.auth.createUserWithEmailAndPassword(email,password)

  }
  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
