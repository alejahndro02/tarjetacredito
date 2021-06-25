import { TarjetaCredito } from './../../models/TarjetaCredito';
import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas:TarjetaCredito[] = [];
  constructor(private _tarjetaService: TarjetaService) { }

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
}
