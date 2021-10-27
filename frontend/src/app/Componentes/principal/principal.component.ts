import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipalService } from 'src/app/Servicios/principal.service';
import { DomSanitizer } from '@angular/platform-browser'; 

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  dataUser={
    idUser: Number,
    nombre: String,
    usuario: String,
    correo: String,
    contra: String,
    foto: String
  }


  Usuario:string | null="";
  ImgUrl: string="../../../assets/Img/descarga.png"
  fileSelected?:Blob;

  name:string="";
  user:string="";
  pass:string="";
  modoBot:string="";

  constructor(private sant:DomSanitizer,
    public princialSevice: PrincipalService,
    public _routre:Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let usuario=this.route.snapshot.paramMap.get("id");
    this.Usuario=usuario;
    this.cargarDatos();
    
  }

  tiles: Tile[] = [
    
    {text: 'Bienvenido', cols: 3, rows: 1, color: 'black'},
  ];

  async cargarDatos(){
    let aux= await this.princialSevice.CargarDatosUser(this.Usuario);
    let json=JSON.stringify(aux)
    let obj= JSON.parse(json)
    this.name=String(obj.nombre)+String(obj.apellido);
    this.user=String(obj.usuario);
    this.pass=String(obj.contra);
    if (obj.chatbot==0){
      this.modoBot="Desactivado";
    }else{
      this.modoBot="Activado";
    }
    console.log(obj)
    this.ImgUrl=obj.foto;
    
    
  }

  async editarUsuario(){
    let mb=0;
    if(this.modoBot=="Desactivado"){
      mb=1;
      this.modoBot="Activado";
    }else{
      mb=0;
      this.modoBot="Desactivado";
    }
    let aux= await this.princialSevice.editarUsuario(this.Usuario,String(mb));
    let json=JSON.stringify(aux)
    let obj= JSON.parse(json)
    if (obj!="error"){
      alert("ModoBot editado!");
    }
  }
  

}
