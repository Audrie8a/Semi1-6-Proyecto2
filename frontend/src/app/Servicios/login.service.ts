import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Foto } from '../Models/Foto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string="http://18.212.37.12:3000/";//"bL-475949248.us-east-2.elb.amazonaws.com:3000/"
  constructor(private httpClient: HttpClient) { }

  Ingresar(Usuario:string, Password:string ){
    const ruta= this.url+"Inicio/LoginCognito";
    const data ={Usuario,Password};
    return this.httpClient.post(ruta,data).toPromise();

  }

  IngresarFoto(id:string, imagen1: string){
    const ruta = this.url+"Inicio/LoginRekognition";
    const data ={id};    
    return this.httpClient.post(ruta,data).toPromise();    
  }
  IngresarFoto_Rekognition(foto: Foto){  
    let urlFoto=environment.urlFotoRekognition;
    return this.httpClient.post<Foto>(urlFoto,foto);
  }
  
  Registrar(Usuario:string,Nombre:string,Apellido:string,Correo:string,Password:string,idFoto:string ){
    const ruta= this.url+"Inicio/RegistroCognito";
    //Nombre,Apellido,Usuario,Correo,Password,idFoto
    const data ={Nombre,Apellido,Usuario,Correo,Password,idFoto};
    return this.httpClient.post(ruta,data).toPromise();

  }


  CargarImagen( id:string|null, foto: string ){
    const ruta = this.url+"subirfoto";
    const data= {id,foto};
    return this.httpClient.post(ruta,data).toPromise();

  }
}
