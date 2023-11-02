import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  private readonly ruta = inject(ActivatedRoute)
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService = inject(NotificacionService);


  public pelicula!: DetallesPelicula | undefined;

  @Output() guardarDescripcionEmitter = new EventEmitter();


  ngOnInit(){
    this.ruta.params.subscribe(params =>{
      this.pelicula = this.peliculasFavoritasService.getPeliculaFavoritaById(params['id']);
    })
  }

  public guardarDescripcion(){
    let datos_pelicula = {
      id: this.pelicula?.imdbID,
      descripcion: this.pelicula?.description
    }
    this.peliculasFavoritasService.substituirDatosDePeliculaDeFavoritos(datos_pelicula);
    this.notificacionService.crearNotificacion('Saved description');
  }
}
