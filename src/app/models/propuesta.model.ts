export interface IPropuesta {
  id: number;
  titulo: string;
  definicion: string;
  archivo: string;
  isDeleted?: boolean;
  deletedAt?: Date;
  estado?: string;
  fechasubida?: Date;
  fechaModificacion?: Date;
  observaciones?: string;

  // Relación con alumnos (guardamos solo IDs)
  alumno1Id?: number;
  alumno2Id?: number;

  // Relación con revisor (gestor/docente)
  revisorId?: number;
}
