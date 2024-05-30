import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresosEgresosService {

  constructor(private firestore: AngularFirestore) { }

  //recivir una instancia del modelo ingreso y egreso
  crearIngresoEgreso(){

  }
}
