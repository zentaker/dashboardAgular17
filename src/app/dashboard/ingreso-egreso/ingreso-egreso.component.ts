import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresosEgresosService } from '../../services/ingresos-egresos.service';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingreso-egreso.component.html',
  styles: ``
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresosEgresosService,
    private store: Store<AppState>
  ){}
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })
  }
  ngOnDestroy(): void {
      this.uiSubscription.unsubscribe();
  }
  guardar(){

    if(this.ingresoForm.invalid){return;}
    
    this.store.dispatch(ui.isLoading())
    
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(()=>{
      this.ingresoForm.reset()
      this.store.dispatch(ui.stopLoading())
    
      //Swal.fire('registro creado', descripcion, 'success')
    }).catch(err =>{
      this.store.dispatch(ui.stopLoading())
      Swal.fire('Error', err.message, 'error')
    })
  }


}
