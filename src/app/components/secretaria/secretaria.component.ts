import { Component } from '@angular/core';

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css']
})
export class SecretariaComponent {
  isRegistrarPlanificacionVisible = false;
  isCargarPropuestasVisible = false;

  showRegistraPlan() {
    this.isRegistrarPlanificacionVisible = true;
    this.isCargarPropuestasVisible = false;
  }

  showCargarPropuestas() {
    this.isCargarPropuestasVisible = true;
    this.isRegistrarPlanificacionVisible = false;
  }
}
