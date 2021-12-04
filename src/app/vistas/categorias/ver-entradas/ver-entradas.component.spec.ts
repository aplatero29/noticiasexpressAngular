import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEntradasComponent } from './ver-entradas.component';

describe('VerEntradasComponent', () => {
  let component: VerEntradasComponent;
  let fixture: ComponentFixture<VerEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEntradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
