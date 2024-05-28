import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../dashboard/shared/ui.actions';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;


  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ){}
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['123@gmail.com', [Validators.required, Validators.email]],
        password: ['123456', Validators.required]
      })
      //la propiedad va cambiar cuando cambie el estado 

      //va a tener la referencia a la subsripcion
      this.uiSubscription = this.store.select('ui').subscribe(ui => {
                                  this.loading = ui.isLoading
                                  console.log('Estado de carga:', this.loading);
                
                                })
  }
  ngOnDestroy(): void {
      //cuando la pagina es destruida
      this.uiSubscription.unsubscribe();

  }
  onSubmit(): void {
    if (this.loginForm.valid) {

      this.store.dispatch(ui.isLoading())//se llama a la accion como unaa funcion

 /*      Swal.fire({
        title: "Espere por favor",
      
        didOpen: () => {
          Swal.showLoading();
          
        }
      }) */
      
      const { email, password } = this.loginForm.value;
      this.authService.loginUsuario(email, password).then(
        credenciales => {
          console.log('Inicio de sesión exitoso:', credenciales);
          /* Swal.close() */
          this.store.dispatch(ui.stopLoading())
          this.router.navigate(['/'])
        }
      ).catch(error => {
        console.error('Error al iniciar sesión:', error);
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message
        });
      });
    } else {
      console.log('Formulario no válido');
    }
  }
 

}
