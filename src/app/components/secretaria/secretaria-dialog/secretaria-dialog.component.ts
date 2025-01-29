import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-secretaria-dialog',
  templateUrl: './secretaria-dialog.component.html',
  styleUrls: ['./secretaria-dialog.component.css']
})

export class SecretariaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SecretariaDialogComponent>,
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

