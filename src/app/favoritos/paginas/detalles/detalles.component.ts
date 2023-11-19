import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { ModificarDatos } from 'src/app/modelos/modificar-datos.model';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  private readonly ruta:ActivatedRoute = inject(ActivatedRoute)
  private readonly peliculasFavoritasService:PeliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService:NotificacionService = inject(NotificacionService);


  public pelicula!:DetallesPelicula;

  @Output() guardarDescripcionEmitter:EventEmitter<ModificarDatos> = new EventEmitter();


  ngOnInit():void {
    this.ruta.params.subscribe(params =>{
      this.pelicula = this.peliculasFavoritasService.getFavoritoById(params['id']);
    })
  }

  public guardarDescripcion() {
    let datos_pelicula: ModificarDatos = {
      id: this.pelicula.imdbID,
      llave: 'description',
      nuevo_valor: this.pelicula.description
    }
    this.peliculasFavoritasService.setValorDeElemento(datos_pelicula);
    this.notificacionService.crearNotificacion('Saved description');
  }
}
