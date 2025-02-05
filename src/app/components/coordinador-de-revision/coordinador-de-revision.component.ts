import { Component, OnInit } from '@angular/core';
import { DocenteService } from 'src/services/docente.service';
import { PropuestaService } from '../../../services/propuestas.service';
import { IDocente } from 'src/app/models/docente.model';
import { IPropuesta } from 'src/app/models/propuesta.model';

@Component({
  selector: 'app-coordinador-de-revision',
  templateUrl: './coordinador-de-revision.component.html',
  styleUrls: ['./coordinador-de-revision.component.css']
})
export class CoordinadorDeRevisionComponent implements OnInit {
  isAsignarPropuestasVisible = false;
  isGenerarReportesVisible = false;

  docentes: IDocente[] = [];
  propuestas: IPropuesta[] = [];

  reportesPropuestasDocente: any[] = [];
  reportesPropuestasObservaciones: any[] = [];

  displayedColumns: string[] = ['docente', 'propuesta', 'acciones'];

  constructor(
    private docenteService: DocenteService,
    private propuestaService: PropuestaService
  ) {}

  ngOnInit(): void {
    this.cargarDocentes();
    this.cargarPropuestas();
  }

  // 🔹 Obtener la lista de docentes desde el backend
  cargarDocentes() {
    this.docenteService.getDocentes().subscribe(
      (docentes) => {
        this.docentes = docentes;
      },
      (error) => {
        console.error('Error al obtener docentes:', error);
      }
    );
  }

  // 🔹 Obtener la lista de propuestas desde el backend
  cargarPropuestas() {
    this.propuestaService.getPropuestas().subscribe(
      (propuestas) => {
        this.propuestas = propuestas;
      },
      (error) => {
        console.error('Error al obtener propuestas:', error);
      }
    );
  }

  // 🔹 Mostrar sección de Asignar Propuestas
  showAsignarPropuestas() {
    this.isAsignarPropuestasVisible = true;
    this.isGenerarReportesVisible = false;
  }

  // 🔹 Mostrar sección de Generar Reportes
  showGenerarReportes() {
    this.isGenerarReportesVisible = true;
    this.isAsignarPropuestasVisible = false;
  }

  // 🔹 Guardar la asignación de una propuesta a un docente
  guardar(docente: IDocente, propuestaId: number) {
    if (!propuestaId) {
      console.error('No se ha seleccionado una propuesta para este docente.');
      return;
    }

    const docenteActualizado: IDocente = {
      ...docente,
      propuestasId: propuestaId // Asigna un solo ID en lugar de un array
    };

    this.docenteService.updateDocente(docente.id, docenteActualizado).subscribe(
      () => {
        console.log(`Propuesta asignada correctamente a ${docente.nombre}`);
      },
      (error) => {
        console.error('Error al asignar propuesta:', error);
      }
    );
  }

  // 🔹 Obtener el listado de propuestas asignadas a cada docente
  obtenerPropuestasPorDocente() {
    this.reportesPropuestasDocente = this.docentes.map((docente) => ({
      docente: `${docente.nombre} ${docente.apellido}`,
      propuesta: this.getPropuestaTitulo(docente.propuestasId),
      estado: this.getPropuestaEstado(docente.propuestasId)
    }));

    console.log('Propuestas por docente:', this.reportesPropuestasDocente);
  }

  // 🔹 Obtener las observaciones de las propuestas
  obtenerPropuestasConObservaciones() {
    this.reportesPropuestasObservaciones = this.propuestas
      .filter((propuesta) => propuesta.observaciones)
      .map((propuesta) => ({
        propuesta: propuesta.titulo,
        observaciones: propuesta.observaciones
      }));

    console.log('Propuestas con observaciones:', this.reportesPropuestasObservaciones);
  }

  // ✅ Método auxiliar para obtener el título de una propuesta por su ID
  private getPropuestaTitulo(id?: number): string {
    return this.propuestas.find((p) => p.id === id)?.titulo || 'Sin asignar';
  }

  // ✅ Método auxiliar para obtener el estado de una propuesta por su ID
  private getPropuestaEstado(id?: number): string {
    return this.propuestas.find((p) => p.id === id)?.estado || 'Sin estado';
  }
}
