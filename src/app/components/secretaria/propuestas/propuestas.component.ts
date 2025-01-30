import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPropuesta } from '../../../models/propuesta.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PropuestasDialogComponent } from './propuestas-dialog/propuestas-dialog.component';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent {
  propuestas: IPropuesta[] = []; // Lista de propuestas

  displayedColumns: string[] = ['id', 'titulo', 'definicion', 'archivo', 'alumnoAsignado', 'acciones'];
  dataSource: MatTableDataSource<IPropuesta>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.propuestas);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para abrir el diálogo y agregar una propuesta
  openDialog(): void {
    const dialogRef = this.dialog.open(PropuestasDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.generateUniqueId();
        this.propuestas.push(result);
        this.dataSource.data = [...this.propuestas]; // Refrescar la tabla
      }
    });
  }

  // Método para editar una propuesta
  editarPropuesta(propuesta: IPropuesta): void {
    const dialogRef = this.dialog.open(PropuestasDialogComponent, {
      width: '400px',
      data: { ...propuesta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.propuestas.findIndex(p => p.id === result.id);
        if (index > -1) {
          this.propuestas[index] = result;
          this.dataSource.data = [...this.propuestas]; // Refrescar la tabla
        }
      }
    });
  }

  // Método para eliminar una propuesta
  eliminarPropuesta(id: number): void {
    this.propuestas = this.propuestas.filter(propuesta => propuesta.id !== id);
    this.dataSource.data = [...this.propuestas]; // Refrescar la tabla
  }

  // Método para aplicar el filtro de búsqueda
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para generar un ID único
  generateUniqueId(): number {
    return this.propuestas.length ? Math.max(...this.propuestas.map(p => p.id)) + 1 : 1;
  }
}
