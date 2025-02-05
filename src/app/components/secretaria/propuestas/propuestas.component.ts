import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PropuestaService } from '../../../../services/propuestas.service';
import { IPropuesta } from 'src/app/models/propuesta.model';
import { IAlumno } from 'src/app/models/alumno.model';
import { IDocente } from 'src/app/models/docente.model';
import { PropuestasDialogComponent } from '../propuestas/propuestas-dialog/propuestas-dialog.component';
import { AlumnoService } from 'src/services/alumno.service';
import { DocenteService } from 'src/services/docente.service';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "titulo",
    "definicion",
    "estado",
    "alumnos",
    "revisor",
    "archivo",  // Nueva columna para archivo
    "fechasubida",
    "fechaModificacion",
    "observaciones",
    "acciones",
  ];

  dataSource: MatTableDataSource<IPropuesta> = new MatTableDataSource<IPropuesta>();
  alumnos: IAlumno[] = [];
  docentes: IDocente[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private propuestaService: PropuestaService,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPropuestas();
    this.cargarAlumnos();
    this.cargarDocentes();
  }

  cargarPropuestas(): void {
    this.propuestaService.getPropuestas().subscribe(
      (propuestas) => {
        this.dataSource.data = propuestas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al obtener las propuestas:', error);
      }
    );
  }

  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe(
      (alumnos) => {
        this.alumnos = alumnos;
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  cargarDocentes(): void {
    this.docenteService.getDocentes().subscribe(
      (docentes) => {
        this.docentes = docentes;
      },
      (error) => {
        console.error('Error al obtener los docentes:', error);
      }
    );
  }

  getAlumnoNombres(alumno1Id?: number, alumno2Id?: number): string {
    const alumno1 = this.alumnos.find(a => a.id === alumno1Id);
    const alumno2 = this.alumnos.find(a => a.id === alumno2Id);
    if (alumno1 && alumno2) {
      return `${alumno1.nombre} ${alumno1.apellido}, ${alumno2.nombre} ${alumno2.apellido}`;
    }
    if (alumno1) {
      return `${alumno1.nombre} ${alumno1.apellido}`;
    }
    if (alumno2) {
      return `${alumno2.nombre} ${alumno2.apellido}`;
    }
    return 'No asignados';
  }

  getRevisorNombre(revisorId?: number): string {
    const revisor = this.docentes.find(d => d.id === revisorId);
    return revisor ? `${revisor.nombre} ${revisor.apellido}` : 'No asignado';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PropuestasDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.propuestaService.addPropuesta(result).subscribe(() => {
          this.cargarPropuestas(); // Recargar la lista después de agregar
        });
      }
    });
  }

  editarPropuesta(propuesta: IPropuesta): void {
    const dialogRef = this.dialog.open(PropuestasDialogComponent, {
      width: '500px',
      data: { ...propuesta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.propuestaService.updatePropuesta(propuesta.id, result).subscribe(() => {
          this.cargarPropuestas(); // Recargar la lista después de editar
        });
      }
    });
  }

  eliminarPropuesta(id: number): void {
    if (confirm("¿Está seguro de eliminar esta propuesta?")) {
      this.propuestaService.deletePropuesta(id).subscribe(() => {
        this.cargarPropuestas(); // Recargar la lista después de eliminar
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
