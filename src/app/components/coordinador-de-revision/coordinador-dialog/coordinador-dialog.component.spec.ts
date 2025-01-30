import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorDialogComponent } from './coordinador-dialog.component';

describe('CoordinadorDialogComponent', () => {
  let component: CoordinadorDialogComponent;
  let fixture: ComponentFixture<CoordinadorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinadorDialogComponent]
    });
    fixture = TestBed.createComponent(CoordinadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
