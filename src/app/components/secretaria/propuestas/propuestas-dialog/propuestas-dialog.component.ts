import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlumno } from 'src/app/models/alumno.model';
import { IDocente } from 'src/app/models/docente.model';
import { IPropuesta } from 'src/app/models/propuesta.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from 'src/services/alumno.service';
import { DocenteService } from 'src/services/docente.service';

@Component({
  selector: 'app-propuestas-dialog',
  templateUrl: './propuestas-dialog.component.html',
  styleUrls: ['./propuestas-dialog.component.css']
})
export class PropuestasDialogComponent implements OnInit {
  propuestaForm!: FormGroup;
  alumnos: IAlumno[] = [];
  docentes: IDocente[] = [];

  constructor(
    public dialogRef: MatDialogRef<PropuestasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPropuesta,
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
    this.cargarDocentes();

    this.propuestaForm = this.fb.group({
      titulo: [this.data?.titulo || '', Validators.required],
      definicion: [this.data?.definicion || '', Validators.required],
      archivo: [this.data?.archivo || '', Validators.required],
      estado: [this.data?.estado || 'En Revisión', Validators.required],
      fechasubida: [this.data?.fechasubida || new Date(), Validators.required],
      fechaModificacion: [this.data?.fechaModificacion || new Date(), Validators.required],
      observaciones: [this.data?.observaciones || ''],
      alumno1Id: [this.data?.alumno1Id || '', Validators.required],
      alumno2Id: [this.data?.alumno2Id || ''],
      revisorId: [this.data?.revisorId || '', Validators.required]
    });
  }

  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe(
      (alumnos) => {
        this.alumnos = alumnos;
      },
      (error) => {
        console.error('Error al obtener alumnos:', error);
      }
    );
  }

  cargarDocentes(): void {
    this.docenteService.getDocentes().subscribe(
      (docentes) => {
        this.docentes = docentes;
      },
      (error) => {
        console.error('Error al obtener docentes:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(null); // Cierra sin guardar cambios
  }

  onSubmit(): void {
    if (this.propuestaForm.valid) {
      this.dialogRef.close(this.propuestaForm.value); // Envía los datos al componente padre
    }
  }
}
