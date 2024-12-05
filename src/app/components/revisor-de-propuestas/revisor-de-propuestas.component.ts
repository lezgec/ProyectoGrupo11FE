import { Component } from '@angular/core';

@Component({
  selector: 'app-revisor-de-propuestas',
  templateUrl: './revisor-de-propuestas.component.html',
  styleUrls: ['./revisor-de-propuestas.component.css']
})
export class RevisorDePropuestasComponent {
  displayedColumns: string[] = ['nombre', 'gestor', 'estado', 'acciones'];
  propuestas: any[] = JSON.parse(localStorage.getItem('propuestas') || '[]');
  mensaje: string = ''; // Mensaje dinámico para errores o confirmaciones

  constructor() {}

  agregarPropuesta(propuesta: any): void {
    if (!propuesta.nombre || !propuesta.gestor || !propuesta.estado) {
      this.mostrarMensaje('Por favor, complete todos los campos de la propuesta.');
      return;
    }
    this.propuestas.push(propuesta);
    this.actualizarLocalStorage();
    this.mostrarMensaje('Propuesta agregada exitosamente.');
  }

  eliminarPropuesta(index: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta propuesta?')) {
      this.propuestas.splice(index, 1);
      this.actualizarLocalStorage();
      this.mostrarMensaje('Propuesta eliminada correctamente.');
    }
  }

  mostrarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
    setTimeout(() => (this.mensaje = ''), 5000); // Limpia el mensaje después de 5 segundos
  }

  actualizarLocalStorage(): void {
    localStorage.setItem('propuestas', JSON.stringify(this.propuestas));
  }
}