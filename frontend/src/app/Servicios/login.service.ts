import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string="http://localhost:3000/";//"bL-475949248.us-east-2.elb.amazonaws.com:3000/"
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
  IngresarFoto_Rekognition(imagen1:string, imagen2: string){
    
    let extension='jpg';
    let similitud=90;
    const data2= {imagen1,imagen2,extension,similitud}
    let respuesta: any="";

    return this.httpClient.post("https://7ptzyp3boh.execute-api.us-east-2.amazonaws.com/desa",data2,{
      headers: new HttpHeaders().set("content-type","application/json")
    }).subscribe(
      res =>  respuesta=res,
      err =>  respuesta="error"
      
    )

    return respuesta;
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
