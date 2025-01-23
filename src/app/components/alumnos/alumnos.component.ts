import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoDialogComponent } from './alumno-dialog/alumno-dialog.component';
import { Alumno } from '../../models/alumno.model';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  
})
export class AlumnosComponent {
  alumnos: Alumno[] = []; // Aquí deberías cargar tus datos, por ejemplo, desde un servicio
  displayedColumns: string[] = ['id','nombre', 'apellido', 'correo', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Alumno>; // Usaremos MatTableDataSource para manejar los datos

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
      data: { id: this.generateUniqueId() }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.estadoPropuesta) {
        this.alumnos.push(result);
        this.dataSource.data = this.alumnos; // Actualizar el dataSource
      }
    });
  }

  // Método para editar un alumno
  editarAlumno(alumno: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '400px',
      data: { ...alumno }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.estadoPropuesta) {
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