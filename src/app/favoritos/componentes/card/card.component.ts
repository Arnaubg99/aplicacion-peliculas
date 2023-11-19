import { Component, Input } from '@angular/core';
import { inject } from '@angular/core';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';
import { FavoritosService } from 'src/app/servicios/favoritos/favoritos.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  private readonly FAVORITOS_SERVICE:FavoritosService;
  private readonly NOTIFICACION_SERVICE:NotificacionService;
  @Input() pelicula!:DetallesPelicula;

  constructor(){
    this.FAVORITOS_SERVICE = inject(FavoritosService);
    this.NOTIFICACION_SERVICE = inject(NotificacionService);
  }
  public eliminarElemento():void {
    this.FAVORITOS_SERVICE.eliminarElementoDeFavoritos(this.pelicula.imdbID)
    this.NOTIFICACION_SERVICE.crearNotificacion('Movie removed from favorites');
  }
}
