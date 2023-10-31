import { TestBed } from '@angular/core/testing';

import { PeliculasFavoritasService } from './peliculas-favoritas.service';

describe('PeliculasFavoritasService', () => {
  let service: PeliculasFavoritasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasFavoritasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
