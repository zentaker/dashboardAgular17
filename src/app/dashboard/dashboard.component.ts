import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setLogLevel } from 'firebase/app';
import { filter, Subscription } from 'rxjs';
import { IngresosEgresosService } from '../services/ingresos-egresos.service';

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
export class DashboardComponent implements OnInit, OnDestroy {
  usersubs!: Subscription;
  constructor(
    private store: Store<AppState>, 
    private ingresoEgresoService: IngresosEgresosService
  ){}

  ngOnInit(): void {
    this.usersubs = this.store.select('user').pipe(
      filter(auth => auth.user != null)
    ).subscribe(({user}) => {
      console.log(user);
      this.ingresoEgresoService.initIngresosEgresosListener(user!.uid)

    })
      
  }
  ngOnDestroy(): void {
      this.usersubs.unsubscribe();
  }

}
