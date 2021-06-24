import { TarjetaCredito } from './../models/TarjetaCredito';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private firebase:AngularFirestore) { }
  
  guardarDatos=(tarjeta:TarjetaCredito):Promise<any>=>{
    return this.firebase.collection('tarjetas').add(tarjeta)
  }
}
