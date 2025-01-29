import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GestorDialogComponent } from './gestor-dialog/gestor-dialog.component';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { IGestor } from 'src/app/models/gestor.model';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent {
  gestores: IGestor[] = []; // Aquí deberías cargar tus datos, por ejemplo, desde un servicio
  displayedColumns: string[] = ['id','nombre', 'apellido', 'correo', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<IGestor>; // Usaremos MatTableDataSource para manejar los datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    
    
    this.dataSource = new MatTableDataSource(this.gestores);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Método para abrir el diálogo y agregar un gestor
  generateUniqueId(): number {
    return this.gestores.length ? Math.max(...this.gestores.map(a => a.id)) + 1 : 1;
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(GestorDialogComponent, {
      //width: '400px',
      data: { id: this.generateUniqueId() }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        this.gestores.push(result);
        this.dataSource.data = this.gestores; // Actualizar el dataSource
      }
    });
  }

  // Método para editar un gestor
  editarGestor(gestores: IGestor): void {
    const dialogRef = this.dialog.open(GestorDialogComponent, {
      //width: '400px',
      data: { ...gestores }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        const index = this.gestores.findIndex(a => a.id === result.id);
        if (index > -1) {
          this.gestores[index] = result;
          this.dataSource.data = this.gestores; // Actualizar el dataSource
        }
      }
    });
  }

  // Método para eliminar un gestor
  eliminarGestor(id: number): void {
    this.gestores = this.gestores.filter(gestores => gestores.id !== id);
    this.dataSource.data = this.gestores; // Actualizar el dataSource
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
