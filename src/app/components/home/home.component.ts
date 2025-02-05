import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '../../../services/propuestas.service';
import { AlumnoService } from 'src/services/alumno.service';
import { DocenteService } from 'src/services/docente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalPropuestas: number = 0;
  totalPropuestasAprobadas: number = 0;
  totalPropuestasRechazadas: number = 0;
  totalPropuestasRevisadas: number = 0;

  totalAlumnos: number = 0;
  totalDocentes: number = 0;
  totalRevisores: number = 0;
  totalCoordinadores: number = 0;

  constructor(
    private propuestaService: PropuestaService,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Obtener propuestas y clasificar por estado
    this.propuestaService.getPropuestas().subscribe((propuestas) => {
      this.totalPropuestas = propuestas.length;
      this.totalPropuestasAprobadas = propuestas.filter(p => p.estado === 'Aprobado').length;
      this.totalPropuestasRechazadas = propuestas.filter(p => p.estado === 'Rechazado').length;
      this.totalPropuestasRevisadas = propuestas.filter(p => p.estado === 'En Revisión').length;
    });

    // Obtener total de alumnos
    this.alumnoService.getAlumnos().subscribe((alumnos) => {
      this.totalAlumnos = alumnos.length;
    });

    // Obtener docentes y clasificarlos por rol
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.totalDocentes = docentes.length;
      this.totalRevisores = docentes.filter(d => d.rol === 'Revisor').length;
      this.totalCoordinadores = docentes.filter(d => d.rol === 'Coordinador').length;
    });
  }
}
