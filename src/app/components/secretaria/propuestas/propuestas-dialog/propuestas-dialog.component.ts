import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-propuestas-dialog',
  templateUrl: './propuestas-dialog.component.html',
  styleUrls: ['./propuestas-dialog.component.css']
})
export class PropuestasDialogComponent {
  // Lista de alumnos disponibles
  alumnos = [
    { id: 1, nombre: 'Alumno 1' },
    { id: 2, nombre: 'Alumno 2' },
    { id: 3, nombre: 'Alumno 3' }
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


