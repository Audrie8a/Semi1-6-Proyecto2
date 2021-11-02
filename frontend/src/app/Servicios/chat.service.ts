import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url:string="http://18.212.37.12:3000/";//"bL-475949248.us-east-2.elb.amazonaws.com:3000/"
  constructor(private httpClient: HttpClient) { }

  getAmigos (idUser:string | null,Usuario:string,tipo:Number){
    const ruta = this.url+"Inicio/Amigos";
    const data = {idUser,Usuario,tipo};
    return this.httpClient.post(ruta,data).toPromise();
  }

  usuario(idUser:string | null){
    const ruta = this.url + "Chat/ident";
    const data = {idUser};
    return this.httpClient.post(ruta, data).toPromise();
  }

  iniciar(idUser:string | null){
    const ruta = this.url + "ElChat";
    const data = {idUser};
    return this.httpClient.get(ruta);
  }

}