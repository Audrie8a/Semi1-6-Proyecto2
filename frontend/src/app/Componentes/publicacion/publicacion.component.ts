import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; 
import { PublicacionService } from 'src/app/Servicios/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  Publicaciones: any;
  Tags: any;
  Usuario:string | null="";
  //Publicacion
  txtPublicacion: string = '';
  base64: string="Base64...";
  fileSelected?:Blob;
  ImagenP:string = '';
  //Filtrar
  TagsF='';
  txtTagF:string='';

  @ViewChild('fileInput',{static:false}) fileInput!: ElementRef;  
  constructor(private sant:DomSanitizer,
    public publicacionService:PublicacionService ,
    public _routre:Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    let usuario=this.route.snapshot.paramMap.get("id");
    this.getTags();
    this.Usuario=usuario;
    this.getArchivos();
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

  onFileUpload(){    
    this.fileSelected= this.fileInput.nativeElement.files[0];
    //const imageBlob=this.fileInput.nativeElement.files[0];
    //this.imageUrl=this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;

    this.convertFileToBase64();
    
    if (this.base64!="Base64..."){
      alert("Subiendo Archivo!");
      let arryaAux=this.base64.split(",",2)
      this.base64=arryaAux[1];
      
      //alert(this.archivo+' antes de');
      let respuesta=this.publicacionService.crearPublicacion(this.txtPublicacion,this.Usuario,this.base64);
      let json=JSON.stringify(respuesta)
      let obj= JSON.parse(json)
      if (obj!= "error" ){
        alert("Publicacion Creada!");
        window.location.reload();
        this.txtPublicacion='';
        this.base64="Base64...";
        this.fileSelected=undefined;
        this.fileInput.nativeElement.files[0]=undefined;
        
      }
    }

  }

  convertFileToBase64(){
    
    let reader= new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    
    reader.onloadend=()=>{
      this.base64=reader.result as string;
      //console.log(this.base64+'/--*-*-*');
    }   
  }
  

  async getArchivos(){
    let aux= await this.publicacionService.getPublicacion(this.Usuario);
    let json=JSON.stringify(aux)
    let obj= JSON.parse(json)
    this.Publicaciones = obj;
  }

  async getTags(){
    let aux= await this.publicacionService.getTags();
    let json=JSON.stringify(aux)
    let obj= JSON.parse(json)
    this.Tags = obj;
  }

  async getPublicacionesFiltradas (){
    let aux= await this.publicacionService.getPublicacionFiltrada(this.Usuario,this.TagsF);
    let json=JSON.stringify(aux)
    let obj= JSON.parse(json)
    this.Publicaciones=obj;

  }

  async Traducir(id:string, texto:string){
    let aux= await this.publicacionService.traducir(texto);
    let json=JSON.stringify(aux)
    let obj= JSON.parse(json);
    var contador=0;
    this.Publicaciones.forEach((element: { idArchivo: string; }) => {
      if(element.idArchivo==id){
        this.Publicaciones[contador].texto=obj.message.TranslatedText;
        return;
      }
      contador++;
    });
    
  }
  borrarFiltros(){
    this.ngOnInit();
  }

}
