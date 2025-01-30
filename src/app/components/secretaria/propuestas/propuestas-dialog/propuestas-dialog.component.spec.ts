import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasDialogComponent } from './propuestas-dialog.component';

describe('PropuestasDialogComponent', () => {
  let component: PropuestasDialogComponent;
  let fixture: ComponentFixture<PropuestasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropuestasDialogComponent]
    });
    fixture = TestBed.createComponent(PropuestasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
