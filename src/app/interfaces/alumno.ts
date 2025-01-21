
export interface Alumno{

  id: number,
  nombre: string,
  apellido: string,
  correo: string,
  telefono: string,
  propuestaDefinicion: string,
  isDeleted: boolean,
  deletedAt: Date,
  propuestas: []

}
