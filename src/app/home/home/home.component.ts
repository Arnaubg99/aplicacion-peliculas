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
  private readonly apiService:ApiServiceService;
  private readonly peliculasFavoritasService:PeliculasFavoritasService;
  private readonly notificacionService:NotificacionService;

  public titulo:string;
  public peliculas:Pelicula[];
  public errorDeBusqueda:string;

  constructor(){
    this.apiService = inject(ApiServiceService);
    this.peliculasFavoritasService = inject(PeliculasFavoritasService);
    this.notificacionService = inject(NotificacionService);

    this.titulo = '';
    this.peliculas = [];
    this.errorDeBusqueda = '';
  }

  public seleccionarPeliculas():void {
      this.apiService.buscarPeliculas(`s=${this.titulo}`).subscribe((respuesta) => {
        if(respuesta.Search){
          this.peliculas = respuesta.Search;
          this.errorDeBusqueda = '';
        }else{
          this.peliculas = [];
          this.errorDeBusqueda = respuesta.Error
        }
      },(error) => {
        console.error(error)
        this.notificacionService.crearNotificacion('Something went wrong.')
      })
  }

  public agregarAFavoritos(pelicula_id: string):void {
    if(this.peliculasFavoritasService.getPeliculasFavoritas.some(objeto => objeto.imdbID === pelicula_id)){
      this.peliculasFavoritasService.eliminarElementoDeFavoritos(pelicula_id)
      this.notificacionService.crearNotificacion('Movie removed from favorites');
    }else{
      this.peliculasFavoritasService.agregarElementoAFavoritos(pelicula_id)
      this.notificacionService.crearNotificacion('Movie added to favorites');
    }
  }

  public resetFiltro(){
    this.titulo = '';
    this.seleccionarPeliculas();
  }
}
