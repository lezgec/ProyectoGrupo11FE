import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisorDePropuestasComponent } from './revisor-de-propuestas.component';

describe('RevisorDePropuestasComponent', () => {
  let component: RevisorDePropuestasComponent;
  let fixture: ComponentFixture<RevisorDePropuestasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisorDePropuestasComponent]
    });
    fixture = TestBed.createComponent(RevisorDePropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
