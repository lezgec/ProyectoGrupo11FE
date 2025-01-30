import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent implements OnInit {
  planificacionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.planificacionForm = this.fb.group({
      ciclo: ['Ciclo I', Validators.required],
      fechaInicioProyecto: ['', Validators.required],
      fechaFinProyecto: ['', Validators.required],
      fechaInicioTutorias: ['', Validators.required],
      fechaFinTutorias: ['', Validators.required],
      fechaInicioRevision: ['', Validators.required],
      fechaFinRevision: ['', Validators.required],
      fechaInicioSustentacion: ['', Validators.required],
      fechaFinSustentacion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.planificacionForm.valid) {
      console.log('Form Submitted', this.planificacionForm.value);
      // Aquí puedes agregar la lógica para guardar los datos, por ejemplo, llamando a un servicio.
    }
  }
}
