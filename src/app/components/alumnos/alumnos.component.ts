import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoDialogComponent } from './alumno-dialog/alumno-dialog.component';
import { IAlumno } from '../../models/alumno.model';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],

})
export class AlumnosComponent {
  alumnos: IAlumno[] = [
    { id: 1, cedula: '1102233445', nombre: 'Juan', apellido: 'Pérez', telefono: '0991112233', correo: 'juan@example.com' },
    { id: 2, cedula: '1105544332', nombre: 'María', apellido: 'López', telefono: '0993322114', correo: 'maria@example.com' },
    { id: 3, cedula: '1109988776', nombre: 'Carlos', apellido: 'Ramírez', telefono: '0995566778', correo: 'carlos@example.com' },
    { id: 4, cedula: '1108877665', nombre: 'Ana', apellido: 'Fernández', telefono: '0996677889', correo: 'ana@example.com' },
    { id: 5, cedula: '1106655443', nombre: 'Luis', apellido: 'Torres', telefono: '0997788991', correo: 'luis@example.com' }
  ]; // Aquí deberías cargar tus datos, por ejemplo, desde un servicio
  displayedColumns: string[] = ['id','cedula','nombre', 'apellido', 'correo', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<IAlumno>; // Usaremos MatTableDataSource para manejar los datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {


    this.dataSource = new MatTableDataSource(this.alumnos);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Método para abrir el diálogo y agregar un alumno
  generateUniqueId(): number {
    return this.alumnos.length ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '400px',
      data: { id: this.generateUniqueId(), cedula: '', nombre: '', apellido: '', telefono: '', correo: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        // Agregar el nuevo estudiante
        const nuevoAlumno: IAlumno = {
          id: this.generateUniqueId(),
          cedula: result.cedula,
          nombre: result.nombre,
          apellido: result.apellido,
          telefono: result.telefono,
          correo: result.correo
        };

        this.alumnos.push(nuevoAlumno);
        this.dataSource.data = [...this.alumnos]; // Clonar el array para forzar la actualización de Angular
      }
    });
  }

  // Método para editar un alumno
  editarAlumno(alumno: IAlumno): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      //width: '400px',
      data: { ...alumno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        const index = this.alumnos.findIndex(a => a.id === result.id);
        if (index > -1) {
          this.alumnos[index] = result;
          this.dataSource.data = this.alumnos; // Actualizar el dataSource
        }
      }
    });
  }

  // Método para eliminar un alumno
  eliminarAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
    this.dataSource.data = this.alumnos; // Actualizar el dataSource
  }

  // Método para aplicar el filtro
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
