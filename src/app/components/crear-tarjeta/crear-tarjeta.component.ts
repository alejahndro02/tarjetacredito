import { TarjetaCredito } from './../../models/TarjetaCredito';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private _tajetaService:TarjetaService ) { 
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta:['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      fechaExpiracion:['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      cvv:['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
    })
  }

  ngOnInit(): void {
  }
crearTarjeta=()=>{
  console.log(this.form);
  const TARJETA:TarjetaCredito = {
    titular:this.form.value.titular,
    numeroTarjeta:this.form.value.numeroTarjeta,
    fechaExpiracion:this.form.value.fechaExpiracion,
    cvv:this.form.value.cvv,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
  }
  console.log(TARJETA);
  this._tajetaService.guardarDatos(TARJETA).then(()=>{
    console.log('registro exitoso');
    this.form.reset();
  }, error=>{
    console.log(error);
    
  })
  
}
}
