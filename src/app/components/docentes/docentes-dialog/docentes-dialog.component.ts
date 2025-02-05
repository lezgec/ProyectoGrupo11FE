import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocenteService } from '../../../../services/docente.service';
import { IDocente } from '../../../models/docente.model';

@Component({
  selector: 'app-docentes-dialog',
  templateUrl: './docentes-dialog.component.html',
  styleUrls: ['./docentes-dialog.component.css']
})
export class DocentesDialogComponent implements OnInit {
  docenteForm!: FormGroup;
  isEditMode: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDocente | null, // Puede ser null para crear un nuevo docente
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data && !!this.data.id; // Verificamos si tiene ID

    this.docenteForm = this.fb.group({
      cedula: [this.data?.cedula || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombre: [this.data?.nombre || '', Validators.required],
      apellido: [this.data?.apellido || '', Validators.required],
      telefono: [this.data?.telefono || '', [Validators.pattern(/^\d{10}$/)]],
      correo: [this.data?.correo || '', [Validators.required, Validators.email]],
      rol: [this.data?.rol || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (this.docenteForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios correctamente.';
      return;
    }

    const docente: IDocente = {
      ...this.docenteForm.value
    };

    if (this.isEditMode) {
      // Actualizar docente
      this.docenteService.updateDocente(this.data!.id, docente).subscribe({
        next: () => this.dialogRef.close(docente),
        error: () => (this.errorMessage = 'Error al actualizar el docente. Intente de nuevo.')
      });
    } else {
      // Agregar nuevo docente
      this.docenteService.addDocente(docente).subscribe({
        next: (nuevoDocente) => this.dialogRef.close(nuevoDocente),
        error: () => (this.errorMessage = 'Error al agregar el docente. Intente de nuevo.')
      });
    }
  }
}
