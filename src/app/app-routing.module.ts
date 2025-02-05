import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CoordinadorDeRevisionComponent } from './components/coordinador-de-revision/coordinador-de-revision.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { SecretariaComponent } from './components/secretaria/secretaria.component';
import { RevisorDePropuestasComponent } from './components/revisor-de-propuestas/revisor-de-propuestas.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'revisor', component: RevisorDePropuestasComponent },
  { path: 'coordinador-de-revision', component: CoordinadorDeRevisionComponent },
  { path: 'docentes', component: DocentesComponent },
  { path: 'secretaria', component:SecretariaComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
