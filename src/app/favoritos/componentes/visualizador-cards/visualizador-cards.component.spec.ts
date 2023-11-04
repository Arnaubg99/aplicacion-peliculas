import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorCardsComponent } from './visualizador-cards.component';

describe('VisualizadorCardsComponent', () => {
  let component: VisualizadorCardsComponent;
  let fixture: ComponentFixture<VisualizadorCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizadorCardsComponent]
    });
    fixture = TestBed.createComponent(VisualizadorCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
