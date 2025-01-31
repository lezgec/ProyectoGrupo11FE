import { IDocente } from './docente.model';
import { IPropuesta } from './propuesta.model';
export interface IAlumno {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  propuesta?: IPropuesta;
  revisor?: IDocente;


}
