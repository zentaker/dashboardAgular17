import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule,NavbarComponent, SidebarComponent, FooterComponent],
  template: `
  

  <app-navbar></app-navbar>
 <div class="page-body-wrapper">
  <app-sidebar></app-sidebar>
  <div class="main-panel">
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  </div>
 </div>
  
  `,
  styles: ``
})
export class DashboardComponent {

}
