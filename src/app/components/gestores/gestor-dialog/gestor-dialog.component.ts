import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gestor-dialog',
  templateUrl: './gestor-dialog.component.html',
  styleUrls: ['./gestor-dialog.component.css']
})
export class GestorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GestorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del alumno si es edición
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    // Aquí pasamos los datos del formulario de vuelta al componente de alumnos
    this.dialogRef.close(this.data);
  }
}

