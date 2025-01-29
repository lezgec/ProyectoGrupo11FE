import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisoresDialogComponent } from './revisores-dialog.component';

describe('RevisoresDialogComponent', () => {
  let component: RevisoresDialogComponent;
  let fixture: ComponentFixture<RevisoresDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisoresDialogComponent]
    });
    fixture = TestBed.createComponent(RevisoresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
