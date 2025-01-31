import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlumno } from 'src/app/models/alumno.model';
@Component({
  selector: 'app-propuestas-dialog',
  templateUrl: './propuestas-dialog.component.html',
  styleUrls: ['./propuestas-dialog.component.css']
})
export class PropuestasDialogComponent {
  // Lista de alumnos disponibles
 alumnos: IAlumno[] = [
       { id: 1, cedula: '1102233445', nombre: 'Juan', apellido: 'Pérez', telefono: '0991112233', correo: 'juan@example.com' },
       { id: 2, cedula: '1105544332', nombre: 'María', apellido: 'López', telefono: '0993322114', correo: 'maria@example.com' },
       { id: 3, cedula: '1109988776', nombre: 'Carlos', apellido: 'Ramírez', telefono: '0995566778', correo: 'carlos@example.com' },
       { id: 4, cedula: '1108877665', nombre: 'Ana', apellido: 'Fernández', telefono: '0996677889', correo: 'ana@example.com' },
       { id: 5, cedula: '1106655443', nombre: 'Luis', apellido: 'Torres', telefono: '0997788991', correo: 'luis@example.com' }
     ];

  constructor(
    public dialogRef: MatDialogRef<PropuestasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos si es edición
  ) {}

  onCancel(): void {
    this.dialogRef.close(null); // Cierra el diálogo sin cambios
  }

  onSubmit(): void {
    if (this.data.titulo && this.data.definicion && this.data.archivo && this.data.alumno) {
      this.dialogRef.close(this.data); // Enviar los datos de vuelta solo si son válidos
    }
  }
}


