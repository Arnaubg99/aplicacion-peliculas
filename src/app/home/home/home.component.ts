import { Component, inject } from '@angular/core';
import { ApiServiceService } from 'src/app/servicios/api-service/api-service.service';

import { Pelicula } from 'src/app/modelos/pelicula.model';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private readonly apiService = inject(ApiServiceService);
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);

  public titulo!: string;
  public peliculas: Pelicula[] = [];
  public errorDeBusqueda: string = '';
  public notificacion: string = '';
  public temporizadorNotificacion: any;
  public readonly CABEZERAS_DE_LA_TABLA: string[] = ['Title', 'imdbID', 'Year', 'Type', 'Poster', 'Favoritos'];

  ngAfterContentInit(){
    console.log('scdsac')
  }

  public seleccionarPeliculas(){
      this.apiService.getPeliculas(this.titulo).subscribe((respuesta) => {
        if(respuesta.Search){
          this.peliculas = respuesta.Search;
          this.errorDeBusqueda = '';
        }else{
          this.peliculas = [];
          this.errorDeBusqueda = respuesta.Error
        }
      })
  }

  public agregarAFavoritos(pelicula_id: string){
    if(this.temporizadorNotificacion){
      clearTimeout(this.temporizadorNotificacion)
    }

    if(this.peliculasFavoritasService.getArrayPeliculasFavoritas.some(objeto => objeto.imdbID === pelicula_id)){
      this.peliculasFavoritasService.eliminarPeliculaDeFavoritos(pelicula_id)
      this.notificacion = 'Película eliminada de favoritos'

    }else{
      this.peliculasFavoritasService.agregarPeliculaAFavoritos(pelicula_id)
      this.notificacion = 'Película añadida a favoritos'
    }
    this.temporizadorNotificacion = setTimeout(()=>{
      this.notificacion = ''
    }, 3500)
  }

}
