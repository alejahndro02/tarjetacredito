import { TarjetaCredito } from './../../models/TarjetaCredito';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private _tajetaService:TarjetaService,
              private toastr: ToastrService ) { 
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta:['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      fechaExpiracion:['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      cvv:['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
    })
  }

  ngOnInit(): void {
    this._tajetaService.getTarjetaEdit().subscribe(data=>{
      console.log(data);
      
    })
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

  this.loading = true;
  
  this._tajetaService.guardarDatos(TARJETA).then(()=>{
    this.loading=false;
    this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta Registrada');
    this.form.reset();
  }, error=>{
    this.loading=false;
    this.toastr.error('Ops! se produjo un error', 'Error')
  })
  
}
}
