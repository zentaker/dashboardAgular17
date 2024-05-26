import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import firebase from 'firebase/compat';
import { environment } from '../../../enviroments/enviroment';
import { AuthService } from '../../services/auth.service';


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


export class RegisterComponent implements OnInit{
  registroForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
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

    

  } 


  onSubmit() {
    // Verifica si el formulario es válido
    if (this.registroForm.valid) {
      const {nombre, correo, password} = this.registroForm.value;
      this.authService.crearusuario(nombre,correo, password).then(
        credenciales => {
          console.log(credenciales);
          this.router.navigate(['/'])
        }
      ).catch(err => console.error(err))
    } else {
      console.log('Formulario no válido');
    }
  }

}



