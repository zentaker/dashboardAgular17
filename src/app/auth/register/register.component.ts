import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit{
  registroForm!: FormGroup;
  constructor(private fb: FormBuilder){}


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
      console.log(this.registroForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

}



