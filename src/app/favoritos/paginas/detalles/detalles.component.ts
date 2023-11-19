import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { ModificarDatos } from 'src/app/modelos/modificar-datos.model';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';
import { FavoritosService } from 'src/app/servicios/favoritos/favoritos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  private readonly ruta:ActivatedRoute;
  private readonly FAVORITOS_SERVICE:FavoritosService;
  private readonly NOTIFICACION_SERVICE:NotificacionService;

  public pelicula!:DetallesPelicula;

  @Output() guardarDescripcionEmitter:EventEmitter<ModificarDatos>;

  constructor(){
    this.ruta = inject(ActivatedRoute);
    this.FAVORITOS_SERVICE = inject(FavoritosService);
    this.NOTIFICACION_SERVICE = inject(NotificacionService);

    this.guardarDescripcionEmitter = new EventEmitter();
  }

  ngOnInit():void {
    this.ruta.params.subscribe(params =>{
      this.pelicula = this.FAVORITOS_SERVICE.getFavoritoById(params['id']);
    })
  }

  public guardarDescripcion() {
    let datos_pelicula: ModificarDatos = {
      id: this.pelicula.imdbID,
      llave: 'description',
      nuevo_valor: this.pelicula.description
    }
    this.FAVORITOS_SERVICE.setValorDeElemento(datos_pelicula);
    this.NOTIFICACION_SERVICE.crearNotificacion('Saved description');
  }
}
