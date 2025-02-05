import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPropuesta } from '../../src/app/models/propuesta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Propuesta/';

  constructor(private http: HttpClient) {}

  // Obtener todas las propuestas
  getPropuestas(): Observable<IPropuesta[]> {
    return this.http.get<IPropuesta[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Obtener una propuesta por ID
  getPropuestaById(id: number): Observable<IPropuesta> {
    return this.http.get<IPropuesta>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  // Crear una nueva propuesta
  addPropuesta(propuesta: IPropuesta): Observable<IPropuesta> {
    return this.http.post<IPropuesta>(`${this.myAppUrl}${this.myApiUrl}`, propuesta);
  }

  // Actualizar una propuesta existente
  updatePropuesta(id: number, propuesta: IPropuesta): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, propuesta);
  }

  // Eliminar una propuesta (eliminación lógica)
  deletePropuesta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
