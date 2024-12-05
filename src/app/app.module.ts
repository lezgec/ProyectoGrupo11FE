import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RevisorDePropuestasComponent } from './components/revisor-de-propuestas/revisor-de-propuestas.component';
import { CoordinadorDeRevisionComponent } from './components/coordinador-de-revision/coordinador-de-revision.component';
import { GestoresComponent } from './components/gestores/gestores.component';
import { SecretariaComponent } from './components/secretaria/secretaria.component';
import { GestorDialogComponent } from './components/gestores/gestor-dialog/gestor-dialog.component';
import { AlumnoDialogComponent } from './components/alumnos/alumno-dialog/alumno-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    RevisorDePropuestasComponent,
    CoordinadorDeRevisionComponent,
    GestoresComponent,
    SecretariaComponent,
    GestorDialogComponent,
    AlumnoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
