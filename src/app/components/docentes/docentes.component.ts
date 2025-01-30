import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocentesDialogComponent } from './docentes-dialog/docentes-dialog.component';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { IDocente } from 'src/app/models/docente.model';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent {
  docentes: IDocente[] = []; // Aquí deberías cargar tus datos, por ejemplo, desde un servicio
  displayedColumns: string[] = ['id','nombre', 'apellido', 'correo', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<IDocente>; // Usaremos MatTableDataSource para manejar los datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {


    this.dataSource = new MatTableDataSource(this.docentes);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Método para abrir el diálogo y agregar un gestor
  generateUniqueId(): number {
    return this.docentes.length ? Math.max(...this.docentes.map(a => a.id)) + 1 : 1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocentesDialogComponent, {
      //width: '400px',
      data: { id: this.generateUniqueId() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        this.docentes.push(result);
        this.dataSource.data = this.docentes; // Actualizar el dataSource
      }
    });
  }

  // Método para editar un gestor
  editarDocente(docentes: IDocente): void {
    const dialogRef = this.dialog.open(DocentesDialogComponent, {
      //width: '400px',
      data: { ...docentes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        const index = this.docentes.findIndex(a => a.id === result.id);
        if (index > -1) {
          this.docentes[index] = result;
          this.dataSource.data = this.docentes; // Actualizar el dataSource
        }
      }
    });
  }

  // Método para eliminar un gestor
  eliminarDocente(id: number): void {
    this.docentes = this.docentes.filter(docentes => docentes.id !== id);
    this.dataSource.data = this.docentes; // Actualizar el dataSource
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
