import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocentesDialogComponent } from './docentes-dialog/docentes-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDocente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/services/docente.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cedula', 'nombre', 'apellido', 'correo', 'telefono', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<IDocente>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.obtenerDocentes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Obtener todos los docentes desde el backend
  obtenerDocentes(): void {
    this.docenteService.getDocentes().subscribe({
      next: (docentes) => {
        this.dataSource.data = docentes;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error('Error al obtener los docentes:', error)
    });
  }


  // ✅ Abrir el diálogo para agregar/editar un docente
  openDialog(docente?: IDocente): void {
    const isEditMode = !!docente;
    const dialogRef = this.dialog.open(DocentesDialogComponent, {
      width: '400px',
      data: isEditMode
        ? { ...docente, isEditMode }
        : { id: 0, cedula: '', nombre: '', apellido: '', telefono: '', correo: '', rol: '', isEditMode }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.isEditMode ? this.actualizarDocente(result) : this.crearDocente(result);
      }
    });
  }

  // ✅ Crear un nuevo docente
  crearDocente(docente: IDocente): void {
    this.docenteService.addDocente(docente).subscribe(
      () => {
        this.obtenerDocentes(); // 🔄 Recargar la lista de docentes
      },
      (error) => {
        console.error('❌ Error al agregar el docente:', error);
      }
    );
  }

  // ✅ Actualizar un docente existente
  actualizarDocente(docente: IDocente): void {
    const dialogRef = this.dialog.open(DocentesDialogComponent, {
      width: '400px',
      data: { ...docente } // Pasamos una copia del objeto para evitar modificar directamente
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerDocentes(); // 🔄 Recargar la lista después de editar
      }
    });
  }


  // ✅ Eliminar un docente
  eliminarDocente(id: number): void {
    this.docenteService.deleteDocente(id).subscribe(
      () => {
        this.obtenerDocentes(); // 🔄 Recargar la lista de docentes
      },
      (error) => {
        console.error('❌ Error al eliminar el docente:', error);
      }
    );
  }

  // ✅ Filtrar docentes en la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }
}
