import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GestorDialogComponent } from './gestor-dialog/gestor-dialog.component';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  gestores: any[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.gestores = JSON.parse(localStorage.getItem('gestores') || '[]');
  }

  // Abre el diálogo para crear un nuevo gestor
  openGestorDialog(): void {
    const dialogRef = this.dialog.open(GestorDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Agregar el nuevo gestor
        result.id = this.gestores.length + 1;
        this.gestores.push(result);
        localStorage.setItem('gestores', JSON.stringify(this.gestores));
      }
    });
  }
}
