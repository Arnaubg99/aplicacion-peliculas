import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService = inject(NotificacionService);
  @Input() pelicula!: DetallesPelicula;

  @Output() eliminarPeliculaDeFavoritosEmitter = new EventEmitter();

  public eliminarPeliculaDeFavoritos(){
    this.eliminarPeliculaDeFavoritosEmitter.emit(this.pelicula.imdbID)
  }
}
