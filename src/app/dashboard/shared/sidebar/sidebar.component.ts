import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  logout(){
    return this.authService.logout();


  }

}
