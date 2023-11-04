import { Injectable, inject } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { NotificacionService } from '../notificacion/notificacion.service';
import { DetallesPeliculaClass } from 'src/app/clases/detalles-pelicula';
import { ModificarDatos } from 'src/app/modelos/modificar-datos.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasFavoritasService {
  private readonly apiService:ApiServiceService = inject(ApiServiceService);
  private readonly notificacionService:NotificacionService = inject(NotificacionService);

  private arrayPeliculasFavoritas:BehaviorSubject<DetallesPelicula[]> = new BehaviorSubject<DetallesPelicula[]>([]);
  public arrayPeliculasFavoritas$:Observable<DetallesPelicula[]> = this.arrayPeliculasFavoritas.asObservable();

  constructor() {
      let arrayPeliculasIdsAlmacenadasEnElLocalStorage:string = localStorage.getItem('peliculas-favoritas') || '[]';
      this.arrayPeliculasFavoritas.next(JSON.parse(arrayPeliculasIdsAlmacenadasEnElLocalStorage))
  }

  get getPeliculasFavoritas() : DetallesPelicula[]{
    return this.arrayPeliculasFavoritas.getValue()
  }

  public getPeliculaFavoritaById(pelicula_id:string):DetallesPelicula {
    let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
    let pelicula:DetallesPelicula | undefined = arrayPeliculas.find(pelicula => pelicula.imdbID === pelicula_id);
    return pelicula ? pelicula : new DetallesPeliculaClass();

  }

  public agregarPeliculaAFavoritos(pelicula_id:string):void {
    this.apiService.buscarPeliculas(`i=${pelicula_id}`).subscribe((pelicula)=>{
      let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
      arrayPeliculas.push(pelicula)
      this.arrayPeliculasFavoritas.next(arrayPeliculas)
      localStorage.setItem('peliculas-favoritas', JSON.stringify(arrayPeliculas))
    }, (error) => {
      this.notificacionService.crearNotificacion(error)
    })
  }

  public eliminarPeliculaDeFavoritos(pelicula_id:string):void {
    try {
      let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
      let pelicula_index:number = arrayPeliculas.findIndex((pelicula) => pelicula.imdbID === pelicula_id);
      if (pelicula_index !== -1) {
        arrayPeliculas.splice(pelicula_index, 1);
        this.arrayPeliculasFavoritas.next(arrayPeliculas)
        localStorage.setItem('peliculas-favoritas', JSON.stringify(arrayPeliculas));
      }
    } catch (error) {
      this.notificacionService.crearNotificacion('The movie could not be deleted')
    }
  }

  public substituirDescripcionDePeliculaDeFavoritos(datos_pelicula: ModificarDatos):void {
    let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
    let pelicula_index:number = arrayPeliculas.findIndex(pelicula => pelicula.imdbID === datos_pelicula.id);
    if(pelicula_index != -1){
      let llave:string = datos_pelicula.llave ?? '';
      (arrayPeliculas[pelicula_index]as any)[llave] = datos_pelicula.nuevo_valor;
      localStorage.setItem('peliculas-favoritas', JSON.stringify(arrayPeliculas))
    }
  }

  public filtrarPeliculasDeFavoritos(texto: string): DetallesPelicula[] {
    let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
    return arrayPeliculas.filter(pelicula => {
      return Object.values(pelicula).some(valor => {
        return String(valor).toLowerCase().includes(texto.toLowerCase());
      });
    });
   }
}
