import { Injectable, inject } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { DetallesComponent } from 'src/app/favoritos/paginas/detalles/detalles.component';
import { NotificacionService } from '../notificacion.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasFavoritasService {
  private readonly apiService = inject(ApiServiceService);
  private readonly notificacionService = inject(NotificacionService);

  private arrayPeliculasFavoritas: DetallesPelicula[];


  constructor() {
      let arrayPeliculasIdsAlmacenadasEnElLocalStorage = localStorage.getItem('peliculas-favoritas') || '[]';
      this.arrayPeliculasFavoritas = JSON.parse(arrayPeliculasIdsAlmacenadasEnElLocalStorage)
  }

  get getArrayPeliculasFavoritas(){
      return [...this.arrayPeliculasFavoritas]
   }

   public getPeliculaFavoritaById(pelicula_id:string): DetallesPelicula | undefined {
    return this.arrayPeliculasFavoritas.find(obj => obj.imdbID === pelicula_id);
  }

  agregarPeliculaAFavoritos(pelicula_id:string){
    this.apiService.buscarPeliculas(`i=${pelicula_id}`).subscribe((pelicula)=>{
      this.arrayPeliculasFavoritas.push(pelicula)
      localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas))
    }, (error) => {
      this.notificacionService.crearNotificacion(error)
    })
  }

  eliminarPeliculaDeFavoritos(pelicula_id:string){
    try {
      const peliculaIndex = this.arrayPeliculasFavoritas.findIndex((pelicula) => pelicula.imdbID === pelicula_id);
      if (peliculaIndex !== -1) {
        this.arrayPeliculasFavoritas.splice(peliculaIndex, 1);
        localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas));
      }
    } catch (error) {
      this.notificacionService.crearNotificacion('The movie could not be deleted')
    }
  }

  substituirDatosDePeliculaDeFavoritos(datos_pelicula: any){
    let pelicula_index = this.arrayPeliculasFavoritas.findIndex(obj => obj.imdbID === datos_pelicula.id);
    if(pelicula_index != -1){
      this.arrayPeliculasFavoritas[pelicula_index].description = datos_pelicula.descripcion;
      localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas))
    }
  }

  filtrarPeliculasDeFavoritos(parametros_de_busqueda: Partial<DetallesPelicula> ){
    let resultado = this.getArrayPeliculasFavoritas.filter(obj =>
    Object.keys(parametros_de_busqueda).every(key =>
      key in obj &&
      typeof obj[key as keyof DetallesPelicula] === 'string' &&
      obj[key as keyof DetallesPelicula] === (parametros_de_busqueda[key as keyof DetallesPelicula]))
    );
      return resultado;
  }

}
