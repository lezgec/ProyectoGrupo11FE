import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocente } from '../app/models/docente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Gestor/';

  constructor(private http: HttpClient) {}

  getDocentes(): Observable<IDocente[]> {
    return this.http.get<IDocente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getDocenteById(id: number): Observable<IDocente> {
    return this.http.get<IDocente>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addDocente(docente: IDocente): Observable<IDocente> {
    return this.http.post<IDocente>(`${this.myAppUrl}${this.myApiUrl}`, docente);
  }

  updateDocente(id: number, docente: IDocente): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, docente);
  }

  deleteDocente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
