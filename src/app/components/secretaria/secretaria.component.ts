import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecretariaDialogComponent } from '../secretaria/secretaria-dialog/secretaria-dialog.component';
import { IPropuesta } from '../../models/propuesta.model';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SecretariaComponent {
  propuestas: IPropuesta[] = []; // Aquí deberías cargar tus datos, por ejemplo, desde un servicio
  displayedColumns: string[] = ['id','titulo', 'definicion', 'archivo', 'acciones'];
  dataSource: MatTableDataSource<IPropuesta>; // Usaremos MatTableDataSource para manejar los datos

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
  generateUniqueId(): number {
    return this.propuestas.length ? Math.max(...this.propuestas.map(a => a.id)) + 1 : 1;
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(SecretariaDialogComponent, {
      //width: '400px',
      data: { id: this.generateUniqueId() }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        this.propuestas.push(result);
        this.dataSource.data = this.propuestas; // Actualizar el dataSource
      }
    });
  }

  // Método para editar una propuesta
  editarPropuestas(propuestas: IPropuesta): void {
    const dialogRef = this.dialog.open(SecretariaDialogComponent, {
      //width: '400px',
      data: { ...propuestas }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.apellido && result.correo && result.telefono) {
        const index = this.propuestas.findIndex(a => a.id === result.id);
        if (index > -1) {
          this.propuestas[index] = result;
          this.dataSource.data = this.propuestas; // Actualizar el dataSource
        }
      }
    });
  }

  // Método para eliminar una propuesta
  eliminarPropuestas(id: number): void {
    this.propuestas = this.propuestas.filter(propuestas => propuestas.id !== id);
    this.dataSource.data = this.propuestas; // Actualizar el dataSource
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