import { Component, inject } from '@angular/core';
import { FavoritosService } from 'src/app/servicios/favoritos/favoritos.service';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent  {
  private readonly FAVORITOS_SERVICE:FavoritosService;

  public arrayPeliculasFavoritas:DetallesPelicula[];
  public filtroTexto:string;

  constructor(){
    this.FAVORITOS_SERVICE = inject(FavoritosService);

    this.arrayPeliculasFavoritas = [];
    this.filtroTexto = '';
  }

  ngOnInit():void {
    this.FAVORITOS_SERVICE.arrayFavoritos$.subscribe(
      peliculas =>{
        this.arrayPeliculasFavoritas = peliculas
      }
    )
  }
 }


