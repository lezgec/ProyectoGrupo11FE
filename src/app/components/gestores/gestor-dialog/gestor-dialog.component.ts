import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gestor-dialog',
  templateUrl: './gestor-dialog.component.html',
  styleUrls: ['./gestor-dialog.component.css']
})
export class GestorDialogComponent {

  nuevoGestor: any = { nombre: '', apellidos: '', correo: '', telefono: '' };

  constructor(
    public dialogRef: MatDialogRef<GestorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarGestor(): void {
    if (!this.nuevoGestor.nombre || !this.nuevoGestor.apellidos || !this.nuevoGestor.correo || !this.nuevoGestor.telefono) {
      return; // No guardamos si hay campos vacíos
    }

    // Enviar el nuevo gestor al componente principal
    this.dialogRef.close(this.nuevoGestor);
  }
}
