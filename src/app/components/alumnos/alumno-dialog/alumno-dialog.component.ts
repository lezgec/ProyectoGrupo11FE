import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlumnoService } from '../../../../services/alumno.service';
import { IAlumno } from '../../../models/alumno.model';

@Component({
  selector: 'app-alumno-dialog',
  templateUrl: './alumno-dialog.component.html',
  styleUrls: ['./alumno-dialog.component.css']
})
export class AlumnoDialogComponent implements OnInit {
  alumnoForm!: FormGroup;
  isEditMode: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlumno | null, // Puede ser null para crear un nuevo alumno
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data && !!this.data.id; // Verificamos si tiene ID

    this.alumnoForm = this.fb.group({
      cedula: [this.data?.cedula || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombre: [this.data?.nombre || '', Validators.required],
      apellido: [this.data?.apellido || '', Validators.required],
      telefono: [this.data?.telefono || '', [Validators.pattern(/^\d{10}$/)]],
      correo: [this.data?.correo || '', [Validators.required, Validators.email]]
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (this.alumnoForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios correctamente.';
      return;
    }

    const alumno: IAlumno = {
      ...this.alumnoForm.value
    };

    if (this.isEditMode) {
      // Actualizar alumno
      this.alumnoService.updateAlumno(this.data!.id, alumno).subscribe({
        next: () => this.dialogRef.close(alumno),
        error: () => (this.errorMessage = 'Error al actualizar el alumno. Intente de nuevo.')
      });
    } else {
      // Agregar nuevo alumno (Eliminar ID si existe)
      this.alumnoService.addAlumno(alumno).subscribe({
        next: (nuevoAlumno) => this.dialogRef.close(nuevoAlumno),
        error: () => (this.errorMessage = 'Error al agregar el alumno. Intente de nuevo.')
      });
    }
  }
}
