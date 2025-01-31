import { Component } from '@angular/core';
import { IAlumno } from '../../models/alumno.model';
import { IDocente } from '../../models/docente.model';
import { IPropuesta } from '../../models/propuesta.model';

@Component({
  selector: 'app-coordinador-de-revision',
  templateUrl: './coordinador-de-revision.component.html',
  styleUrls: ['./coordinador-de-revision.component.css']
})
export class CoordinadorDeRevisionComponent {

  isAsignarPropuestasVisible = false;
  isGenerarReportesVisible = false;

  docentes: IDocente[] = [
        { id: 1, nombre: 'Roberto', apellido: 'García', telefono: '0991234567', correo: 'roberto@example.com', rol: 'Revisor' },
        { id: 2, nombre: 'Ana', apellido: 'Torres', telefono: '0997654321', correo: 'ana@example.com', rol: 'Revisor' },
        { id: 3, nombre: 'Luis', apellido: 'Fernández', telefono: '0999988776', correo: 'luis@example.com', rol: 'Revisor' },
        { id: 4, nombre: 'Sofía', apellido: 'Rojas', telefono: '0991112223', correo: 'sofia@example.com', rol: 'Coordinador' },
        { id: 5, nombre: 'Andrés', apellido: 'Gutiérrez', telefono: '0995554443', correo: 'andres@example.com', rol: 'Revisor' }
      ];

      // Lista de alumnos
      alumnos: IAlumno[] = [
        { id: 1, cedula: '1102233445', nombre: 'Juan', apellido: 'Pérez', telefono: '0991112233', correo: 'juan@example.com' },
        { id: 2, cedula: '1105544332', nombre: 'María', apellido: 'López', telefono: '0993322114', correo: 'maria@example.com' },
        { id: 3, cedula: '1109988776', nombre: 'Carlos', apellido: 'Ramírez', telefono: '0995566778', correo: 'carlos@example.com' },
        { id: 4, cedula: '1108877665', nombre: 'Ana', apellido: 'Fernández', telefono: '0996677889', correo: 'ana@example.com' },
        { id: 5, cedula: '1106655443', nombre: 'Luis', apellido: 'Torres', telefono: '0997788991', correo: 'luis@example.com' }
      ];
    propuestas: IPropuesta[] = [
        {
          id: 1,
          titulo: 'Energía Solar en la Industria',
          definicion: 'Estudio sobre la eficiencia de paneles solares en industrias.',
          archivo: 'https://ejemplo.com/proyecto1.pdf',
          alumnosAsignado: [this.alumnos[0]],
          estado: 'En Revisión',
          revisorAsignado: this.docentes[0],
          fechasubida: new Date('2024-05-10'),
          fechaModificacion: new Date('2024-06-01'),
          historial: [
            { estado: 'Subido', fecha: new Date('2024-05-10'), observacion: 'Proyecto subido' },
            { estado: 'En Revisión', fecha: new Date('2024-06-01'), observacion: 'Pendiente de evaluación' }
          ]
        },
        {
          id: 2,
          titulo: 'Inteligencia Artificial en la Educación',
          definicion: 'Uso de IA para personalizar el aprendizaje en escuelas.',
          archivo: 'https://ejemplo.com/proyecto2.pdf',
          alumnosAsignado: [this.alumnos[1]],
          estado: 'Aprobado',
          revisorAsignado: this.docentes[1],
          fechasubida: new Date('2024-04-15'),
          fechaModificacion: new Date('2024-05-05'),
          historial: [
            { estado: 'Subido', fecha: new Date('2024-04-15'), observacion: 'Proyecto cargado' },
            { estado: 'Aprobado', fecha: new Date('2024-05-05'), observacion: 'Cumple con los requisitos' }
          ]
        },
        {
          id: 3,
          titulo: 'Impacto del Cambio Climático',
          definicion: 'Análisis de los efectos del cambio climático en la biodiversidad.',
          archivo: 'https://ejemplo.com/proyecto3.pdf',
          alumnosAsignado: [this.alumnos[2]],
          estado: 'Rechazado',
          revisorAsignado: this.docentes[2],
          fechasubida: new Date('2024-03-20'),
          fechaModificacion: new Date('2024-04-02'),
          historial: [
            { estado: 'Subido', fecha: new Date('2024-03-20'), observacion: 'Proyecto subido' },
            { estado: 'Rechazado', fecha: new Date('2024-04-02'), observacion: 'Falta bibliografía' }
          ]
        }
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
      propuesta: propuesta.titulo,
      observaciones: propuesta.observaciones
    }));

    console.log('Propuestas con observaciones:', this.reportesPropuestasObservaciones);
  }
}
