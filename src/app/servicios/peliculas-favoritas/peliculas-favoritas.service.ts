import { Injectable, inject } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasFavoritasService {
  private readonly apiService = inject(ApiServiceService);
  private arrayPeliculasFavoritasId: string[] = [];
  private arrayPeliculasFavoritas: DetallesPelicula[];


  constructor() {
      let arrayPeliculasIdsAlmacenadasEnElLocalStorage = localStorage.getItem('peliculas-favoritas') || '[]';
      this.arrayPeliculasFavoritas = JSON.parse(arrayPeliculasIdsAlmacenadasEnElLocalStorage)

      // let arrayDePeticionesDePeliculas: Observable<any>[] = [];

      // this.arrayPeliculasFavoritasId.forEach((peliculaId: string) =>{
      //     let peticion =  this.apiService.getDetallesPeliculaById(peliculaId)
      //     arrayDePeticionesDePeliculas.push(peticion)
      // })

      // forkJoin(arrayDePeticionesDePeliculas).subscribe((respuestas) => {
      //   this.arrayPeliculasFavoritas.next(respuestas)
      // })
  }

  get getArrayPeliculasFavoritas(){
      return [...this.arrayPeliculasFavoritas]
   }

  get getArrayPeliculasFavoritasId(){
    return [...this.arrayPeliculasFavoritasId]
  }

  agregarPeliculaAFavoritos(pelicula_id:string){
    this.apiService.getDetallesPeliculaById(pelicula_id).subscribe((pelicula)=>{
      this.arrayPeliculasFavoritas.push(pelicula)
      localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritas))
      console.log(this.arrayPeliculasFavoritas)
    })
  }

  eliminarPeliculaAFavoritos(pelicula_id:string){
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritas.filter((pelicula) => {
        return pelicula.imdbID != pelicula_id
    })

    localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritasId))
    console.log(this.arrayPeliculasFavoritasId)
  }

}
