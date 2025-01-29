import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaDialogComponent } from './secretaria-dialog.component';

describe('SecretariaDialogComponent', () => {
  let component: SecretariaDialogComponent;
  let fixture: ComponentFixture<SecretariaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretariaDialogComponent]
    });
    fixture = TestBed.createComponent(SecretariaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
