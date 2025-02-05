import { Component, OnInit } from '@angular/core';
import { IAlumno } from '../../models/alumno.model';
import { IPropuesta } from '../../models/propuesta.model';
import { AlumnoService } from 'src/services/alumno.service';
import { PropuestaService } from '../../../services/propuestas.service';

@Component({
  selector: 'app-revisor-de-propuestas',
  templateUrl: './revisor-de-propuestas.component.html',
  styleUrls: ['./revisor-de-propuestas.component.css']
})
export class RevisorDePropuestasComponent implements OnInit {
  propuestas: IPropuesta[] = [];
  alumnos: IAlumno[] = [];

  constructor(private alumnoService: AlumnoService, private propuestaService: PropuestaService) {}

  ngOnInit() {
    this.obtenerAlumnos();
    this.obtenerPropuestas();
  }

  obtenerAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (alumnos) => {
        this.alumnos = alumnos;
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  obtenerPropuestas() {
    this.propuestaService.getPropuestas().subscribe(
      (propuestas) => {
        this.propuestas = propuestas;
      },
      (error) => {
        console.error('Error al obtener las propuestas:', error);
      }
    );
  }

  getAlumnoNombre(id: number | undefined): string {
    if (!id) return '';
    const alumno = this.alumnos.find(a => a.id === id);
    return alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Desconocido';
  }

  guardarRevision(propuesta: IPropuesta) {
    if (!propuesta.id) {
      console.error('Error: La propuesta no tiene un ID válido.');
      return;
    }

    const propuestaActualizada: IPropuesta = {
      id: propuesta.id,
      estado: propuesta.estado,
      observaciones: propuesta.observaciones,
      titulo: '',
      definicion: '',
      archivo: ''
    };

    this.propuestaService.updatePropuesta(propuesta.id, propuestaActualizada).subscribe({
      next: () => {
        console.log('Revisión guardada correctamente');
        alert('Revisión guardada con éxito');
      },
      error: (error) => {
        console.error('Error al guardar la revisión:', error);
        alert('Hubo un error al guardar la revisión');
      }
    });
  }

}
