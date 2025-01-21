import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/interfaces/alumno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/alumno/';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

}
