import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    
    private router: Router
  ){}
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['123@gmail.com', [Validators.required, Validators.email]],
        password: ['123456', Validators.required]
      })
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      Swal.fire({
        title: "Espere por favor",
      
        didOpen: () => {
          Swal.showLoading();
          
        }
      })
      
      const { email, password } = this.loginForm.value;
      this.authService.loginUsuario(email, password).then(
        credenciales => {
          console.log('Inicio de sesión exitoso:', credenciales);
          Swal.close()
          this.router.navigate(['/'])
        }
      ).catch(error => {
        console.error('Error al iniciar sesión:', error);
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
