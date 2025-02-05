import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule} from '@angular/material/card';
import { MatTreeModule} from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';


import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CoordinadorDeRevisionComponent } from './components/coordinador-de-revision/coordinador-de-revision.component';
import { AlumnoDialogComponent } from './components/alumnos/alumno-dialog/alumno-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { DocentesDialogComponent } from './components/docentes/docentes-dialog/docentes-dialog.component';
import { SecretariaComponent } from './components/secretaria/secretaria.component';
import { PlanificacionComponent } from './components/secretaria/planificacion/planificacion.component';
import { CoordinadorDialogComponent } from './components/coordinador-de-revision/coordinador-dialog/coordinador-dialog.component';
import { PropuestasComponent } from './components/secretaria/propuestas/propuestas.component';
import { PropuestasDialogComponent } from './components/secretaria/propuestas/propuestas-dialog/propuestas-dialog.component';
import { RevisorDePropuestasComponent } from './components/revisor-de-propuestas/revisor-de-propuestas.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CoordinadorDeRevisionComponent,
    AlumnoDialogComponent,
    HomeComponent,
    DocentesComponent,
    DocentesDialogComponent,
    SecretariaComponent,
    PlanificacionComponent,
    CoordinadorDialogComponent,
    PropuestasComponent,
    PropuestasDialogComponent,
    RevisorDePropuestasComponent

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
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatCardModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatExpansionModule,
    HttpClientModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
