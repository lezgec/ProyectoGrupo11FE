import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoDialogComponent } from './alumno-dialog/alumno-dialog.component';
import { AlumnoService } from '../../../services/alumno.service';
import { IAlumno } from '../../models/alumno.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cedula', 'nombre', 'apellido', 'correo', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<IAlumno>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSource.data = alumnos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error('Error al obtener los alumnos:', error)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '400px',
      data: null // Indica que se está agregando un nuevo alumno
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Recargar la lista de alumnos después de agregar uno nuevo
        this.cargarAlumnos();
      }
    });
  }

  editarAlumno(alumno: IAlumno): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '400px',
      data: { ...alumno }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos(); // Actualiza la tabla después de editar
      }
    });
  }

  eliminarAlumno(id: number): void {
    this.alumnoService.deleteAlumno(id).subscribe({
      next: () => this.cargarAlumnos(), // Recargar la lista tras eliminar
      error: (error) => console.error('Error al eliminar el alumno:', error)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
