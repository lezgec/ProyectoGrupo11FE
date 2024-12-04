import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorDeRevisionComponent } from './coordinador-de-revision.component';

describe('CoordinadorDeRevisionComponent', () => {
  let component: CoordinadorDeRevisionComponent;
  let fixture: ComponentFixture<CoordinadorDeRevisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinadorDeRevisionComponent]
    });
    fixture = TestBed.createComponent(CoordinadorDeRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
