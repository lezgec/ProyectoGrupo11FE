import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  // Datos de ejemplo que representarán a los alumnos
  alumnos = [
    { nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@gmail.com', telefono: '1234567890' },
    { nombre: 'Ana', apellido: 'Gómez', correo: 'ana.gomez@yahoo.com', telefono: '0987654321' },
    { nombre: 'Carlos', apellido: 'Martínez', correo: 'carlos.martinez@hotmail.com', telefono: '1122334455' }
  ];

  // Definir las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono'];

  constructor() { }

  ngOnInit(): void {
    // Aquí se pueden realizar tareas de inicialización si es necesario
  }

}
