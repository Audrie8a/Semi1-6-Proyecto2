import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Componentes/login/login.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';

import {MatTabsModule} from '@angular/material/tabs';
import { SubirArchivoComponent } from './Componentes/subir-archivo/subir-archivo.component';
import { EditarArchivoComponent } from './Componentes/editar-archivo/editar-archivo.component';
import { EliminarArchivoComponent } from './Componentes/eliminar-archivo/eliminar-archivo.component';
import { AgregarAmigoComponent } from './Componentes/agregar-amigo/agregar-amigo.component';
import { VerArchivosComponent } from './Componentes/ver-archivos/ver-archivos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { WebcamModule } from 'ngx-webcam';
import { CamaraComponent } from './Componentes/camara/camara.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    SubirArchivoComponent,
    EditarArchivoComponent,
    EliminarArchivoComponent,
    AgregarAmigoComponent,
    VerArchivosComponent,
    CamaraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    WebcamModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
