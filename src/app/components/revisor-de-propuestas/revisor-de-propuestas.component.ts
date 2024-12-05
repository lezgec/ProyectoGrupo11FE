import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revisor-de-propuestas',
  templateUrl: './revisor-de-propuestas.component.html',
  styleUrls: ['./revisor-de-propuestas.component.css']
})
export class RevisorDePropuestasComponent implements OnInit {

  // Lista de propuestas
  propuestas: any[] = [];

  // Datos de la nueva propuesta
  nuevaPropuesta: any = { propuesta: '', gestor: '', estado: '' };

  // Mensaje de error
  mensaje: string = '';

  gestores: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Cargar las propuestas desde el localStorage
    this.propuestas = JSON.parse(localStorage.getItem('propuestas') || '[]');
    // Cargar los gestores desde el localStorage
    this.gestores = JSON.parse(localStorage.getItem('gestores') || '[]');
  }

  // Agregar una nueva propuesta
  agregarPropuesta() {
    if (!this.nuevaPropuesta.propuesta || !this.nuevaPropuesta.gestor || !this.nuevaPropuesta.estado) {
      this.mensaje = 'Por favor, complete todos los campos.';
      return;
    }

    // Asignar un ID único
    this.nuevaPropuesta.id = this.propuestas.length + 1;

    // Agregar la nueva propuesta
    this.propuestas.push({ ...this.nuevaPropuesta });

    // Guardar la lista de propuestas en el localStorage
    localStorage.setItem('propuestas', JSON.stringify(this.propuestas));

    // Limpiar los campos
    this.nuevaPropuesta = { propuesta: '', gestor: '', estado: '' };
    this.mensaje = '';
  }

  // Eliminar una propuesta
  eliminarPropuesta(id: number) {
    this.propuestas = this.propuestas.filter(propuesta => propuesta.id !== id);
    localStorage.setItem('propuestas', JSON.stringify(this.propuestas));
  }
}
