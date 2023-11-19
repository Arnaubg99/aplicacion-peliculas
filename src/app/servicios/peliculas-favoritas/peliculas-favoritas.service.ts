import { LocalStorageService } from './../local-storage/local-storage.service';
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
  private readonly apiService:ApiServiceService;
  private readonly notificacionService:NotificacionService
  private readonly LocalStorageService:LocalStorageService

  private arrayFavoritos:BehaviorSubject<DetallesPelicula[]>;
  public arrayFavoritos$:Observable<DetallesPelicula[]>;

  constructor() {
    this.apiService = inject(ApiServiceService);
    this.notificacionService = inject(NotificacionService);
    this.LocalStorageService = inject(LocalStorageService);

    this.arrayFavoritos = new BehaviorSubject<DetallesPelicula[]>(JSON.parse(this.LocalStorageService.getDatos('peliculas-favoritas')));
    this.arrayFavoritos$ = this.arrayFavoritos.asObservable();
  }

  get getPeliculasFavoritas():DetallesPelicula[] {
    return [...this.arrayFavoritos.getValue()]
  }

  public getFavoritoById(pelicula_id:string):DetallesPelicula {
    let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
    let pelicula:DetallesPelicula | undefined = arrayPeliculas.find(pelicula => pelicula.imdbID === pelicula_id);

    return pelicula ? pelicula : new DetallesPeliculaClass();
  }

  public agregarElementoAFavoritos(pelicula_id:string):void {
    this.apiService.buscarPeliculas(`i=${pelicula_id}`).subscribe((pelicula)=>{
      let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
      arrayPeliculas.push(pelicula)
      this.arrayFavoritos.next(arrayPeliculas)
      this.LocalStorageService.agregarDatos('peliculas-favoritas', JSON.stringify(arrayPeliculas))
    }, (error) => {
      console.error(error)
      this.notificacionService.crearNotificacion('Something went wrong.')
    })
  }

  public eliminarElementoDeFavoritos(pelicula_id:string):void {
    try {
      let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
      let pelicula_index:number = arrayPeliculas.findIndex((pelicula) => pelicula.imdbID === pelicula_id);
      if (pelicula_index !== -1) {
        arrayPeliculas.splice(pelicula_index, 1);
        this.arrayFavoritos.next(arrayPeliculas)
        this.LocalStorageService.agregarDatos('peliculas-favoritas', JSON.stringify(arrayPeliculas))
      }
    } catch (error) {
      this.notificacionService.crearNotificacion('The movie could not be deleted')
    }
  }

  public setValorDeElemento(datos_pelicula: ModificarDatos):void {
    let arrayPeliculas:DetallesPelicula[] = this.getPeliculasFavoritas
    let pelicula_index:number = arrayPeliculas.findIndex(pelicula => pelicula.imdbID === datos_pelicula.id);
    if(pelicula_index != -1){
      let llave:string = datos_pelicula.llave ?? '';
      (arrayPeliculas[pelicula_index]as any)[llave] = datos_pelicula.nuevo_valor;
      this.LocalStorageService.agregarDatos('peliculas-favoritas', JSON.stringify(arrayPeliculas))
    }
  }
}
