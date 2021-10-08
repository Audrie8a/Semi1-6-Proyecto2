import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  Publicaciones: any;
  //Publicacion
  txtTag:string ='';
  txtPublicacion: string = '';
  ImagenP: string = '';
  lstTags=[''];
  Tags='';
  //Filtrar
  TagsF='';
  txtTagF:string='';

  constructor() { }

  ngOnInit(): void {
  }

  async crearPublicacion(){
    if(this.ImagenP!=''){
      //alert(this.ImagenP);
      if(this.Tags==''){
        this.Tags='Ninguno'
      }
      let respuesta="";//await this.usuarioService.crearPublicacion(this.Usr,this.txtPublicacion, this.ImagenP.substr(12,this.ImagenP.length),this.Tags );
      if(respuesta=="true"){
        //this.onFileUpload2();
        this.ngOnInit();

        alert("Publicado!");
      }else{
        alert("Error al Publicar!");
      }
    }else{
      alert("Se necesita una imagen para publicar!");
    }
    this.Tags='';
    this.ImagenP='';
    this.txtPublicacion='';
  }

  async FiltrarPublicacion(){

    let respuesta="";//await this.usuarioService.getPublicacionesFiltradas(this.Usr,this.TagsF);
    this.Publicaciones =respuesta;
    this.TagsF='';
    if(respuesta=='false'){
      alert("No ha publicaciones con este tag!");
    }
    //this.ngOnInit();
  }

  addTagFiltro(){
    if(this.txtTagF!=''){
      if(this.txtTagF[0]=='#'){
        let splitted=this.txtTagF.split(" ");
        splitted.forEach(element => {
          if(element!=''){
            this.TagsF+="'"+element+"'"+"**";
          }
        });
        this.FiltrarPublicacion();
        alert("Filtrando...");
        this.txtTagF="";
      }else{
        alert("Error, se necesita iniciar con un #");
      }

    }else{
      alert('No se puede agregar un tag vacío!');
    }
  }

  addTag(){
    if(this.txtTag!=''){
      if(this.txtTag[0]=='#'){
        this.Tags+=this.txtTag+"**";
        alert("Tag Agregado!");
        this.txtTag="";
      }else{
        alert("Error, se necesita iniciar con un #");
      }

    }else{
      alert('No se puede agregar un tag vacío!');
    }
  }
  
  borrarFiltros(){
    this.ngOnInit();
  }

}
