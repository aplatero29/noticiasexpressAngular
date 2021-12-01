import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEntradaComponent } from './homepage-entrada.component';

describe('HomepageEntradaComponent', () => {
  let component: HomepageEntradaComponent;
  let fixture: ComponentFixture<HomepageEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
