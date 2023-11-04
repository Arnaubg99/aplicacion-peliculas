import { Component, inject } from '@angular/core';
import { ApiServiceService } from 'src/app/servicios/api-service/api-service.service';

import { Pelicula } from 'src/app/modelos/pelicula.model';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private readonly apiService:ApiServiceService = inject(ApiServiceService);
  private readonly peliculasFavoritasService:PeliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService:NotificacionService = inject(NotificacionService);

  public titulo!:string;
  public peliculas!:Pelicula[];
  public errorDeBusqueda!:string;

  public seleccionarPeliculas(): void{
      this.apiService.buscarPeliculas(`s=${this.titulo}`).subscribe((respuesta) => {
        if(respuesta.Search){
          this.peliculas = respuesta.Search;
          this.errorDeBusqueda = '';
        }else{
          this.peliculas = [];
          this.errorDeBusqueda = respuesta.Error
        }
      })
  }

  public agregarAFavoritos(pelicula_id: string):void {
    if(this.peliculasFavoritasService.getPeliculasFavoritas.some(objeto => objeto.imdbID === pelicula_id)){
      this.peliculasFavoritasService.eliminarPeliculaDeFavoritos(pelicula_id)
      this.notificacionService.crearNotificacion('Movie removed from favorites');
    }else{
      this.peliculasFavoritasService.agregarPeliculaAFavoritos(pelicula_id)
      this.notificacionService.crearNotificacion('Movie added to favorites');
    }
  }
}
