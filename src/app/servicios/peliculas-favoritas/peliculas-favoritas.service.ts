import { Injectable, inject } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasFavoritasService {
  private readonly apiService = inject(ApiServiceService);
  private arrayPeliculasFavoritas: DetallesPelicula[];


  constructor() {
      let arrayPeliculasIdsAlmacenadasEnElLocalStorage = localStorage.getItem('peliculas-favoritas') || '[]';
      this.arrayPeliculasFavoritas = JSON.parse(arrayPeliculasIdsAlmacenadasEnElLocalStorage)
  }

  get getArrayPeliculasFavoritas(){
      return [...this.arrayPeliculasFavoritas]
   }

  agregarPeliculaAFavoritos(pelicula_id:string){
    this.apiService.getDetallesPeliculaById(pelicula_id).subscribe((pelicula)=>{
      this.arrayPeliculasFavoritas.push(pelicula)
      localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas))
      console.log(this.arrayPeliculasFavoritas)
    })
  }

  eliminarPeliculaDeFavoritos(pelicula_id:string){
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritas.filter((pelicula) => {
        return pelicula.imdbID != pelicula_id
    })

    localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas))
  }

  substituirDatosDePeliculaDeFavoritos(datos_pelicula: any){
    let pelicula_index = this.arrayPeliculasFavoritas.findIndex(obj => obj.imdbID === datos_pelicula.id);
    if(pelicula_index != -1){
      this.arrayPeliculasFavoritas[pelicula_index].description = datos_pelicula.descripcion;
      localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas))
    }
  }

}
