import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/Servicios/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  Anuncio1:string="";
  Anuncio2:string="";
  Anuncio3:string="";

  Filtro1:string ="";

  idUsuarioGlobal:string | null="";
  Amigos: any;

  constructor(public _routre:Router,
    public route: ActivatedRoute,
    public chatService: ChatService) { }

  ngOnInit(): void {
    let usuario=this.route.snapshot.paramMap.get("id");
    this.idUsuarioGlobal=usuario;
    this.Inicio(this.idUsuarioGlobal)
  }

  Inicio(usuario: string | null){
    this.borrarRegistros()
    if(usuario!=null){
      this.getAmigos("",0);
    }
  }

  async getAmigos(Usuario2:string,tipo:Number){    
    let aux= await this.chatService.getAmigos(this.idUsuarioGlobal,Usuario2,tipo);
    
    if(aux!='false'){
      let json=JSON.stringify(aux)
      let obj= JSON.parse(json)
    
      this.Amigos=obj;
    }else{
      this.Anuncio1="No cuentas con amigos agregados, agrega unos cuantos ;) !";
    }
    this.Filtro1="";
  }

  async chatear(url: string){
    let usr = await this.chatService.usuario(this.idUsuarioGlobal);
    let obj= JSON.parse(JSON.stringify(usr))
    let ident = obj[0]["usuario"];
    //console.log(ident);
    let chati = await this.chatService.iniciar(ident);
    window.open(url, "_blank");
  }

  borrarRegistros(){
    this.Amigos=[]
    this.Filtro1=""
  }

}
