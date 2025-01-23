import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RevisorDePropuestasComponent } from './components/revisor-de-propuestas/revisor-de-propuestas.component';
import { CoordinadorDeRevisionComponent } from './components/coordinador-de-revision/coordinador-de-revision.component';
import { GestoresComponent } from './components/gestores/gestores.component';
import { SecretariaComponent } from './components/secretaria/secretaria.component';

const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'revisor-de-propuestas', component: RevisorDePropuestasComponent },
  { path: 'coordinador-de-revision', component: CoordinadorDeRevisionComponent },
  { path: 'gestores', component: GestoresComponent },
  { path: 'secretaria', component: SecretariaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
