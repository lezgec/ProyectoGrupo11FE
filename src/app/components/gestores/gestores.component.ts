import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GestorDialogComponent } from './gestor-dialog/gestor-dialog.component';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent {
  gestores: any[] = JSON.parse(localStorage.getItem('gestores') || '[]');
  mensaje: string = ''; // Variable para mostrar mensajes dinámicos

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(GestorDialogComponent, {
      width: '400px',
      data: { nombre: '', apellidos: '', telefono: '', correo: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Validación de campos
        if (!result.nombre || !result.apellidos || !result.telefono || !result.correo) {
          this.mostrarMensaje('Por favor, complete todos los campos antes de guardar.');
          return;
        }

        // Validación de formato de correo
        if (!this.validarCorreo(result.correo)) {
          this.mostrarMensaje('El correo electrónico ingresado no es válido.');
          return;
        }

        // Validación de longitud de teléfono
        if (!this.validarTelefono(result.telefono)) {
          this.mostrarMensaje('El número de teléfono debe contener solo dígitos y tener 10 caracteres.');
          return;
        }

        // Guardar gestor en la lista
        this.gestores.push(result);
        this.actualizarLocalStorage();
        this.mostrarMensaje('Gestor guardado exitosamente.');
      }
    });
  }

  eliminarGestor(index: number): void {
    if (confirm('¿Está seguro de que desea eliminar este gestor?')) {
      this.gestores.splice(index, 1);
      this.actualizarLocalStorage();
      this.mostrarMensaje('El gestor fue eliminado correctamente.');
    }
  }

  mostrarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
    setTimeout(() => this.mensaje = '', 5000); // Limpia el mensaje después de 5 segundos
  }

  actualizarLocalStorage(): void {
    localStorage.setItem('gestores', JSON.stringify(this.gestores));
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  validarTelefono(telefono: string): boolean {
    return /^\d{10}$/.test(telefono);
  }
}