import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import firebase from 'firebase/compat';
import { environment } from '../../../enviroments/enviroment';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../dashboard/shared/ui.actions';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    AngularFireAuthModule,
   
  ],
  templateUrl: './register.component.html',
  styles: ``
})


export class RegisterComponent implements OnInit, OnDestroy{
  registroForm!: FormGroup;
  loading: boolean = false;
  uiSubcription!: Subscription;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ){
    console.log();
  }


  ngOnInit(){
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['123@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    //establecer el estado de cargando y subcribirse al state
    //este estate se puede acceder desde cualquier lugar se puede saber si se esta carganando o no 
    this.uiSubcription = this.store.select('ui')
    .subscribe( ui => this.loading = ui.isLoading)
  } 
  ngOnDestroy(): void {
    // unsubrcibe al momento que de destruya el componente
      this.uiSubcription.unsubscribe();
  }
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.registroForm.valid) {

/* Swal.fire({
  title: "Espere por favor",

  didOpen: () => {
    Swal.showLoading();
    
  }
}) */
      //enviar la accion al store de redux
      this.store.dispatch(ui.isLoading())

      const {nombre, correo, password} = this.registroForm.value;
      this.authService.crearusuario(nombre,correo, password).then(
        credenciales => {
          console.log(credenciales);
          /* Swal.close(); */
          //cambiar el estado cuando se completa
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/'])
        }
      ).catch(err => {
        console.error(err)
        //cambiar el estado si hay un error 
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message
        });
      })
    } else {
      console.log('Formulario no válido');
      
    }
  }

}



