import { Component, inject } from '@angular/core';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent  {
  private readonly peliculasFavoritasService:PeliculasFavoritasService = inject(PeliculasFavoritasService);

  public arrayPeliculasFavoritas!:DetallesPelicula[]

  public filtroTexto!:string

  ngOnInit():void {
    this.peliculasFavoritasService.arrayFavoritos$.subscribe(
      peliculas =>{
        this.arrayPeliculasFavoritas = peliculas
      }
    )
  }
 }


