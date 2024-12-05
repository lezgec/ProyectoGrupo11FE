import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDialogComponent } from './gestor-dialog.component';

describe('GestorDialogComponent', () => {
  let component: GestorDialogComponent;
  let fixture: ComponentFixture<GestorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDialogComponent]
    });
    fixture = TestBed.createComponent(GestorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
