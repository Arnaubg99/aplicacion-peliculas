import { Component, Input } from '@angular/core';
import { inject } from '@angular/core';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  private readonly peliculasFavoritasService:PeliculasFavoritasService;
  private readonly notificacionService:NotificacionService;
  @Input() pelicula!:DetallesPelicula;

  constructor(){
    this.peliculasFavoritasService = inject(PeliculasFavoritasService);
    this.notificacionService = inject(NotificacionService);
  }
  public eliminarElemento():void {
    this.peliculasFavoritasService.eliminarElementoDeFavoritos(this.pelicula.imdbID)
    this.notificacionService.crearNotificacion('Movie removed from favorites');
  }
}
