import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltrosComponent } from './modal-filtros.component';

describe('ModalFiltrosComponent', () => {
  let component: ModalFiltrosComponent;
  let fixture: ComponentFixture<ModalFiltrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFiltrosComponent]
    });
    fixture = TestBed.createComponent(ModalFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
