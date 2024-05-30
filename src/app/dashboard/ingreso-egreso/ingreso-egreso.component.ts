import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingreso-egreso.component.html',
  styles: ``
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';

  constructor(
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['compras', Validators.required],
      monto: ['200', Validators.required]
    })
  }
  guardar(){
    if(this.ingresoForm.invalid){return;}

    console.log(this.ingresoForm.value);
    console.log(this.tipo);
  }


}
