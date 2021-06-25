import { TarjetaCredito } from './../models/TarjetaCredito';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private tarjeta$= new Subject<any>()
  constructor(private firestore:AngularFirestore) { }
  
  guardarDatos(tarjeta:TarjetaCredito):Promise<any>{
    return this.firestore.collection('tarjetas').add(tarjeta);
  }
  obtenerDatos():Observable<any>{
    return this.firestore .collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  eliminarDatos(id:string):Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).delete().then();
  }
  addTajetaEdit(tarjeta:TarjetaCredito){
    this.tarjeta$.next(tarjeta);
  }
  getTarjetaEdit():Observable<TarjetaCredito>{
    return this.tarjeta$.asObservable();
  }
}
