import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEventoComponent } from './detalles-evento.component';

describe('DetallesEventoComponent', () => {
  let component: DetallesEventoComponent;
  let fixture: ComponentFixture<DetallesEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
