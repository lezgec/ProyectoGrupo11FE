import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesDialogComponent } from './docentes-dialog.component';

describe('DocentesDialogComponent', () => {
  let component: DocentesDialogComponent;
  let fixture: ComponentFixture<DocentesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocentesDialogComponent]
    });
    fixture = TestBed.createComponent(DocentesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
