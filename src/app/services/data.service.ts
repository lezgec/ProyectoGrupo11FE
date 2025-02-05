import { Injectable } from '@angular/core';
import { IAlumno } from '../models/alumno.model';
import { IDocente } from '../models/docente.model';
import { IPropuesta } from '../models/propuesta.model';
import { IHistorial } from '../models/historialPropuesta.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Lista de docentes
  docentes: IDocente[] = [];

  // Lista de alumnos
  alumnos: IAlumno[] = [];

  // Lista de propuestas
  propuestas: IPropuesta[] = [];

  constructor() {
    // Asignar propuestas a los alumnos
    this.alumnos[0].propuesta = this.propuestas[0];
    this.alumnos[1].propuesta = this.propuestas[1];
    this.alumnos[2].propuesta = this.propuestas[2];

    // Asignar revisores a alumnos
    this.alumnos[0].revisor = this.docentes[0];
    this.alumnos[1].revisor = this.docentes[1];
    this.alumnos[2].revisor = this.docentes[2];
  }

  // Métodos para obtener los datos
  getAlumnos(): IAlumno[] {
    return this.alumnos;
  }

  getPropuestas(): IPropuesta[] {
    return this.propuestas;
  }

  getDocentes(): IDocente[] {
    return this.docentes;
  }
  getRevisiones() {

  }
}
