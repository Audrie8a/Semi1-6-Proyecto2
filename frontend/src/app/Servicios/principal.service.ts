import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  url:string="http://18.212.37.12:3000/";//"bL-475949248.us-east-2.elb.amazonaws.com:3000/"
  constructor(private httpClient: HttpClient) { }

  CargarDatosUser(idUser:string|null){
    const ruta=this.url+"Inicio/getUser"   
    const data={idUser}
    return this.httpClient.post(ruta,data).toPromise();
  }

  editarUsuario(idUser:string|null,modoBot:string){
    const ruta=this.url+"Inicio/editarUsuario";
    const data={idUser,modoBot}
    return this.httpClient.post(ruta,data).toPromise();
  }

}
