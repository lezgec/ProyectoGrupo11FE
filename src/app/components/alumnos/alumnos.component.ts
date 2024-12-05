import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoDialogComponent } from './alumno-dialog/alumno-dialog.component'; // Crear el componente de diálogo
import { Alumno } from '../../models/alumno.model'; // Asegúrate de tener un modelo para los alumnos

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  alumnos: Alumno[] = []; // Aquí deberías cargar tus datos, por ejemplo, desde un servicio
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'estado', 'acciones'];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '400px',
      data: {} // Aquí pasarías los datos si estás editando un alumno
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí manejarías el resultado, por ejemplo, agregando el nuevo alumno a la lista
        this.alumnos.push(result);
      }
    });
  }

  editarAlumno(alumno: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '400px',
      data: alumno // Pasar los datos del alumno para editarlos
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí actualizarías el alumno en la lista
        const index = this.alumnos.findIndex(a => a.id === result.id);
        this.alumnos[index] = result;
      }
    });
  }

  eliminarAlumno(id: number): void {
    // Aquí eliminarías el alumno, probablemente llamando a un servicio
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
  }
}
