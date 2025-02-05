import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlumno } from '../app/models/alumno.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Alumno/';

  constructor(private http: HttpClient) {}

  // Obtener todos los alumnos con sus relaciones (Propuesta y Docente)
  getAlumnos(): Observable<IAlumno[]> {
    return this.http.get<IAlumno[]>(`${this.myAppUrl}${this.myApiUrl}`);

  }

  // Obtener un alumno por ID
  getAlumnoById(id: number): Observable<IAlumno> {
    return this.http.get<IAlumno>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  // Obtener un alumno por su Cédula
  getAlumnoByCedula(cedula: string): Observable<IAlumno> {
    return this.http.get<IAlumno>(`${this.myAppUrl}${this.myApiUrl}cedula/${cedula}`);
  }

  // Crear un nuevo alumno
  addAlumno(alumno: IAlumno): Observable<IAlumno> {
    return this.http.post<IAlumno>(`${this.myAppUrl}${this.myApiUrl}`, alumno);
  }

  // Actualizar un alumno existente
  updateAlumno(id: number, alumno: IAlumno): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, alumno);
  }

  // Eliminar un alumno (eliminación lógica)
  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}

