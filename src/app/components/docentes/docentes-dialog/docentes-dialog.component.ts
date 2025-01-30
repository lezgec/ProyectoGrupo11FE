import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-docentes-dialog',
  templateUrl: './docentes-dialog.component.html',
  styleUrls: ['./docentes-dialog.component.css']
})
export class DocentesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DocentesDialogComponent>,
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
