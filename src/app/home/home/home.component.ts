import { Component, inject } from '@angular/core';
import { ApiServiceService } from 'src/app/servicios/api-service/api-service.service';

import { Pelicula } from 'src/app/modelos/pelicula.model';
import { FavoritosService } from 'src/app/servicios/favoritos/favoritos.service';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private readonly API_SERVICE:ApiServiceService;
  private readonly FAVORITOS_SERVICE:FavoritosService;
  private readonly NOTIFICACION_SERVICE:NotificacionService;

  public titulo:string;
  public peliculas:Pelicula[];
  public errorDeBusqueda:string;

  constructor(){
    this.API_SERVICE = inject(ApiServiceService);
    this.FAVORITOS_SERVICE = inject(FavoritosService);
    this.NOTIFICACION_SERVICE = inject(NotificacionService);

    this.titulo = '';
    this.peliculas = [];
    this.errorDeBusqueda = '';
  }

  public seleccionarPeliculas():void {
      this.API_SERVICE.buscarPeliculas(`s=${this.titulo}`).subscribe((respuesta) => {
        if(respuesta.Search){
          this.peliculas = respuesta.Search;
          this.errorDeBusqueda = '';
        }else{
          this.peliculas = [];
          this.errorDeBusqueda = respuesta.Error
        }
      },(error) => {
        console.error(error)
        this.NOTIFICACION_SERVICE.crearNotificacion('Something went wrong.')
      })
  }

  public agregarAFavoritos(pelicula_id: string):void {
    if(this.FAVORITOS_SERVICE.getPeliculasFavoritas.some(objeto => objeto.imdbID === pelicula_id)){
      this.FAVORITOS_SERVICE.eliminarElementoDeFavoritos(pelicula_id)
      this.NOTIFICACION_SERVICE.crearNotificacion('Movie removed from favorites');
    }else{
      this.FAVORITOS_SERVICE.agregarElementoAFavoritos(pelicula_id)
      this.NOTIFICACION_SERVICE.crearNotificacion('Movie added to favorites');
    }
  }

  public resetFiltro(){
    this.titulo = '';
    this.seleccionarPeliculas();
  }
}
