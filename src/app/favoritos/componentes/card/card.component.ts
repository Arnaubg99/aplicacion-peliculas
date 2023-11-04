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
  private readonly peliculasFavoritasService:PeliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService:NotificacionService = inject(NotificacionService);
  @Input() pelicula!:DetallesPelicula;

  public eliminarPeliculaDeFavoritos():void{
    this.peliculasFavoritasService.eliminarPeliculaDeFavoritos(this.pelicula.imdbID)
    this.notificacionService.crearNotificacion('Movie removed from favorites');
  }
}
