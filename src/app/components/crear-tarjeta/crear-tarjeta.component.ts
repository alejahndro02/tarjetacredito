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
  titulo ="Agregar Tarjeta";
  id: string | undefined;

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
      this.id=data.id;
      this.titulo = 'Editar Tarjeta'
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,
      })
    })
  }
guardarTarjeta(){
  if(this.id === undefined){
    this.agregarTarjeta();
  }else{
    this.editarTarjeta(this.id)
  }
}
editarTarjeta(id:string){
  const TARJETA:any = {
    titular:this.form.value.titular,
    numeroTarjeta:this.form.value.numeroTarjeta,
    fechaExpiracion:this.form.value.fechaExpiracion,
    cvv:this.form.value.cvv,
    fechaActualizacion: new Date(),
  }
  this.loading=true;
  this._tajetaService.editarTarjeta(id, TARJETA).then(()=>{
    this.loading=false;
    this.titulo= "Agregar Tarjeta";
    this.form.reset()
    this.id= undefined;
    this.toastr.info('La tarjeta fue actualizada con exito', 'Registro Actualizado')
  }, error => {
    console.log(error);
    
  })
}
agregarTarjeta(){
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
