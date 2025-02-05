export interface IDocente {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  rol: string;
  propuestasId?: number;
}
