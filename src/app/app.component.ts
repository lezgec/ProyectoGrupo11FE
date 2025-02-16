import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
interface SecreatariaOptions {
  name: string;
  children?: SecreatariaOptions[];
}

const TREE_DATA: SecreatariaOptions[] = [
  {
    name: 'Secretaria',
    children: [{name: 'Alumnos'}, {name: 'Propuestas'}, {name: 'Gestores'}],
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'ProyectoGrupo11';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  dataSource = TREE_DATA;

    childrenAccessor = (node: SecreatariaOptions) => node.children ?? [];

    hasChild = (_: number, node: SecreatariaOptions) => !!node.children && node.children.length > 0;
    constructor(private observer: BreakpointObserver) {}

    ngOnInit() {
      this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
        if(screenSize.matches){
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    }

    
    toggleMenu() {
      if(this.isMobile){
        this.sidenav.toggle();
        this.isCollapsed = false; // On mobile, the menu can never be collapsed
      } else {
        this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
        this.isCollapsed = !this.isCollapsed;
      }
  }
}
