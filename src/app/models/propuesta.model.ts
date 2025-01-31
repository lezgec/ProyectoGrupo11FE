import { IAlumno } from "./alumno.model";
import { IDocente } from "./docente.model";
import { IHistorial } from "./historialPropuesta.model";
export interface IPropuesta{

    id: number,
    titulo: string,
    definicion: string,
    archivo: string,
    alumnosAsignado?: IAlumno[],
    isDeleted?: boolean,
    deletedAt?: Date,
    estado?: string,
    revisorAsignado?: IDocente,
    fechasubida?: Date,
    fechaModificacion?: Date,
    observaciones?: string,
    historial?: IHistorial[],
  }
