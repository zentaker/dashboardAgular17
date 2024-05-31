import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresosEgresosService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService

  ) { }

  //recivir una instancia del modelo ingreso y egreso
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos`)//no va a ser una collecion
    .collection('items')//va a ser una collecion de elementos
    .add({...ingresoEgreso})//objeto no una instancia de la clase
    .then((ref)=> console.log('exito', ref))
    .catch(err => console.warn(err))

  }
}
