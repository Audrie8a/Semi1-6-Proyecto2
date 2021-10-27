import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  url:string="http://54.204.241.187:3000/";
  constructor(private httpClient: HttpClient) { }

  crearPublicacion (Texto:string,Usuario:string | null,idFoto:string){
    const ruta = this.url+"Publicacion/Publicar";
    const data = {Texto,Usuario,idFoto};
    return this.httpClient.post(ruta,data).toPromise();
  }

  getPublicacion (iduser:string | null){
    const ruta = this.url+"Publicacion/getPublicaciones";
    const data = {iduser};
    return this.httpClient.post(ruta,data).toPromise();
  }

  getPublicacionFiltrada (iduser:string | null, tag:string){
    const ruta = this.url+"Publicacion/getPublicacionesFiltradas";
    const data = {iduser,tag};
    return this.httpClient.post(ruta,data).toPromise();
  }

  getTags (){
    const ruta = this.url+"Publicacion/getTags";
    return this.httpClient.get(ruta).toPromise();
  }
  
  traducir(text:string){
    const ruta =this.url+"Publicacion/Traducir";
    const data = {text};
    return this.httpClient.post(ruta,data).toPromise();
  }
}
