import { Component } from '@angular/core';

@Component({
  selector: 'app-coordinador-de-revision',
  templateUrl: './coordinador-de-revision.component.html',
  styleUrls: ['./coordinador-de-revision.component.css']
})
export class CoordinadorDeRevisionComponent {

  isAsignarPropuestasVisible = false;
  isGenerarReportesVisible = false;

  docentes = [
    { id: 1, nombre: 'Docente 1', propuesta: null },
    { id: 2, nombre: 'Docente 2', propuesta: null },
    { id: 3, nombre: 'Docente 3', propuesta: null }
  ];

  propuestas = [
    { id: 1, nombre: 'Propuesta 1', estado: 'Aprobada', observaciones: 'Debe mejorar redacción' },
    { id: 2, nombre: 'Propuesta 2', estado: 'Pendiente', observaciones: 'Falta estructura' },
    { id: 3, nombre: 'Propuesta 3', estado: 'Rechazada', observaciones: 'No cumple requisitos' }
  ];

  reportesPropuestasDocente: any[] = [];
  reportesPropuestasObservaciones: any[] = [];

  displayedColumns: string[] = ['docente', 'propuesta', 'acciones'];

  showAsignarPropuestas() {
    this.isAsignarPropuestasVisible = true;
    this.isGenerarReportesVisible = false;
  }

  showGenerarReportes() {
    this.isGenerarReportesVisible = true;
    this.isAsignarPropuestasVisible = false;
  }

  editar(docente: any) {
    console.log('Editando docente:', docente);
  }

  guardar(docente: any) {
    console.log('Guardando asignación para docente:', docente);
  }

  obtenerPropuestasPorDocente() {
    // Simulación de obtención de reportes desde una API o lógica de base de datos

    console.log('Propuestas por docente:', this.reportesPropuestasDocente);
  }

  obtenerPropuestasConObservaciones() {
    // Simulación de obtención de reportes con observaciones
    this.reportesPropuestasObservaciones = this.propuestas.map(propuesta => ({
      propuesta: propuesta.nombre,
      observaciones: propuesta.observaciones
    }));

    console.log('Propuestas con observaciones:', this.reportesPropuestasObservaciones);
  }
}
