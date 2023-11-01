import { Component, inject } from '@angular/core';
import { ApiServiceService } from 'src/app/servicios/api-service/api-service.service';

import { resultadoBusqueda } from 'src/app/modelos/resultadoBusqueda.model';
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
  public peliculas: resultadoBusqueda[] = [];
  public errorDeBusqueda: string = '';
  public notificacion: string = '';
  public temporizadorNotificacion: any;
  public readonly CABEZERAS_DE_LA_TABLA: string[] = ['Title', 'imdbID', 'Year', 'Type', 'Poster', 'Favoritos'];

  ngOnInit(){
    this.peliculasFavoritasService.getArrayPeliculasFavoritas.subscribe((respuesta) =>{
      console.log(respuesta)
    })
  }

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

  public agregarAFavoritos(peliculaId: string){
    if(this.temporizadorNotificacion){
      clearTimeout(this.temporizadorNotificacion)
    }

    if(this.peliculasFavoritasService.getArrayPeliculasFavoritasId.includes(peliculaId)){
      this.peliculasFavoritasService.eliminarPeliculaAFavoritos(peliculaId)
      this.notificacion = 'Película eliminada de favoritos'

    }else{
      this.peliculasFavoritasService.agregarPeliculaAFavoritos(peliculaId)
      this.notificacion = 'Película añadida a favoritos'
    }
    this.temporizadorNotificacion = setTimeout(()=>{
      this.notificacion = ''
    }, 3500)
  }

}
