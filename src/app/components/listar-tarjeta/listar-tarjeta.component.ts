import { TarjetaCredito } from './../../models/TarjetaCredito';
import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas:TarjetaCredito[] = [];
  constructor(private _tarjetaService: TarjetaService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }
  obtenerDatos(){
    this._tarjetaService.obtenerDatos().subscribe( (doc) =>{
      this.listTarjetas = [];
      doc.forEach((element:any)=>{
        this.listTarjetas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      })
    })
  }
  eliminarTarjeta(id:any){
    this._tarjetaService.eliminarDatos(id).then(()=>{
      this.toastr.error('El registro se ha eliminado con exito!', 'Registro Eliminado ');
    },error =>{
      this.toastr.error('Opps! hubo un problema','Se ha producido un error');
    })
  }
  editarTarjeta(tarjeta:TarjetaCredito){
    this._tarjetaService.addTajetaEdit(tarjeta);
  }
}
