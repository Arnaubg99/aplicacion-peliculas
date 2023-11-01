import { Injectable, inject } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable, forkJoin, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasFavoritasService {
  private readonly apiService = inject(ApiServiceService);
  private arrayPeliculasFavoritasId: string[] = [];
  private arrayPeliculasFavoritas: Subject<any[]> = new Subject<any[]>();


  constructor() {
      let arrayPeliculasIdsAlmacenadasEnElLocalStorage = localStorage.getItem('peliculas-favoritas') || '[]';
      this.arrayPeliculasFavoritasId = JSON.parse(arrayPeliculasIdsAlmacenadasEnElLocalStorage)

      let arrayDePeticionesDePeliculas: Observable<any>[] = [];

      this.arrayPeliculasFavoritasId.forEach((peliculaId: string) =>{
          let peticion =  this.apiService.getDetallesPeliculaById(peliculaId)
          arrayDePeticionesDePeliculas.push(peticion)
      })

      forkJoin(arrayDePeticionesDePeliculas).subscribe((respuestas) => {
        this.arrayPeliculasFavoritas.next(respuestas)
      })
  }

  get getArrayPeliculasFavoritas(): Observable<any[]> {
      return this.arrayPeliculasFavoritas.asObservable();
   }

  get getArrayPeliculasFavoritasId(){
    return [...this.arrayPeliculasFavoritasId]
  }

  agregarPeliculaAFavoritos(peliculaId:string){
    this.arrayPeliculasFavoritasId.push(peliculaId)
    localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritasId))
    console.log(this.arrayPeliculasFavoritasId)
  }

  eliminarPeliculaAFavoritos(peliculaId:string){
      let peliculaIndex = this.arrayPeliculasFavoritasId.indexOf(peliculaId)
      this.arrayPeliculasFavoritasId.splice(peliculaIndex, 1);
      localStorage.setItem('peliculas-favoritas', JSON.stringify(this.arrayPeliculasFavoritasId))
      console.log(this.arrayPeliculasFavoritasId)

  }

}
