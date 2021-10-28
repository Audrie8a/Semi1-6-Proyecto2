import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
import { MatDialog,MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CamaraComponent } from '../camara/camara.component';
import { Foto } from 'src/app/Models/Foto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('fileInput',{static:false}) fileInput!: ElementRef;
  constructor(public loginService:LoginService,
              public _activatedRoute: ActivatedRoute,
              public _router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  showMainContent: Boolean = false;

  fotoTomada:string="";
  fotoTomada2:string="";

  base64: string="Base64...";
  fileSelected?:Blob;

   //Login
   Usuario: string = '';
   Passwords: string = '';
 
   //Registro
   Usr: string = '';
   Nombre: string = '';
   Apellido: string = '';
   Correo: string ='';
   Pass: string = '';
   Pass2: string = '';
   Foto: string = '';

   linkRouter: string ='';

   async Login() {
      let respuesta: Object='';
     if (this.fotoTomada2==''){
      respuesta = await this.loginService.Ingresar(this.Usuario, this.Passwords);
      if(respuesta==='false'){
        this.linkRouter='/Home'
        alert("Error al ingresar, favor revise sus datos!")
       }else if (respuesta=='error'){
        this.linkRouter='/Home'
        alert("Se produjo un error al ingresar!")
       }else{
        this.borrarRegistro();
        alert("Bienvenido "+respuesta)
        this.linkRouter='/User';
        this._router.navigate([this.linkRouter,respuesta]);
       }
     }else{
      
      respuesta= await this.loginService.IngresarFoto(this.Usuario,this.fotoTomada2);
      let json=JSON.stringify(respuesta)
      let imagen2= "data:image/jpeg;base64,"+JSON.parse(json).foto
      let imagen1= this.fotoTomada2;
      let fto=new Foto(imagen1,imagen2,"jpg","99")
      this.loginService.IngresarFoto_Rekognition(fto).subscribe( data =>{
        let json=JSON.stringify(data);
        let obj= JSON.parse(json)
        respuesta= obj.body
        if(respuesta==undefined){
          this.linkRouter='/Home'
          alert("Error al ingresar, la foto no cumple con el porcentaje de certeza requerido!")
          this.borrarRegistro();
         }else if (respuesta=='error'){
          this.linkRouter='/Home'
          alert("Se produjo un error al ingresar!")
         }else{
          alert("Bienvenido Usuario: "+this.Usuario)
          this.borrarRegistro();
          this.linkRouter='/User';
          this._router.navigate([this.linkRouter,respuesta]);
         }
      })
      
       
     }

     
     
   }

   async Registrar(){
     if(this.fotoTomada==''){
      this.onFileUpload();
     }
     if (this.base64!="Base64..."){
      if (this.Pass==this.Pass2){
        let respuesta = await this.loginService.Registrar(this.Usr,this.Nombre,this.Apellido,this.Correo,this.Pass,this.base64);
        if(respuesta!='error'){
          alert("Se ha registrado correctamente el usuario!");          
          this.borrarRegistro();
        }else{
          alert("Error al registrar usuario!")
        }
      }else{
          alert("Error, las contraseñas no coinciden!");
      }
     }
     
    
  }

  onFileUpload(){    
    this.fileSelected= this.fileInput.nativeElement.files[0];    
    
    
    this.convertFileToBase64();
    
    if (this.base64!="Base64..."){
      alert("Subiendo Imagen!");
      let arryaAux=this.base64.split(",",2)
      this.base64=arryaAux[1];      
    }
        
  }

  convertFileToBase64(){
    let reader= new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend=()=>{
      this.base64=reader.result as string;
      
    }   
    
  }

  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;
  }

  openDialog(): void { //Guardar Foto Registro
    const dialogRef=this.dialog.open(CamaraComponent,{
      width:'710px',
      height: '550px',
      data:{Archivo: this.fotoTomada}
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('The dialog was closed');
      this.fotoTomada=result.Archivo;    
      let arryaAux=this.fotoTomada.split(",",2)
      this.fotoTomada=arryaAux[1];
      this.base64=this.fotoTomada;
      console.log(this.fotoTomada)     
    })
  }

  openDialog2(): void { //Comparar Foto con Registro
    const dialogRef=this.dialog.open(CamaraComponent,{
      width:'710px',
      height: '550px',
      data:{Archivo: this.fotoTomada}
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('The dialog was closed');
      this.fotoTomada2=result.Archivo;
    })
  }

    borrarRegistro(){
      this.Usuario='';
      this.Passwords='';
      this.Usr='';
      this.Apellido='';
      this.Correo='';
      this.Nombre = '';
      this.Pass = '';
      this.Pass2='';
      this.Foto = '';
      this.fotoTomada='';
      this.fotoTomada2='';
    }
}
