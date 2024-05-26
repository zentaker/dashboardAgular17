import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../enviroments/enviroment';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
 
 <div class="container-scroller">
 <router-outlet></router-outlet>
 </div>
  `,
  styles: ``
})
export class AppComponent {
  title = 'dashboard';
  constructor(private authService: AuthService){
    this.authService.initAuthListener();

  }
}
