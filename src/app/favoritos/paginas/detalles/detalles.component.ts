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
  private readonly ruta = inject(ActivatedRoute)
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService = inject(NotificacionService);


  public pelicula!: DetallesPelicula;

  @Output() guardarDescripcionEmitter = new EventEmitter();


  ngOnInit(){
    this.ruta.params.subscribe(params =>{
      this.pelicula = this.peliculasFavoritasService.getPeliculaFavoritaById(params['id']);
    })
  }

  public guardarDescripcion(){
    let datos_pelicula: ModificarDatos = {
      id: this.pelicula.imdbID,
      llave: 'description',
      nuevo_valor: this.pelicula.description
    }
    this.peliculasFavoritasService.substituirDescripcionDePeliculaDeFavoritos(datos_pelicula);
    this.notificacionService.crearNotificacion('Saved description');
  }
}
