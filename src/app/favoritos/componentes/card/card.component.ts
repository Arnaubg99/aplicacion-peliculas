import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pelicula!: DetallesPelicula;

  @Output() guardarDescripcionEmitter = new EventEmitter();

  public guardarDescripcion(){
    let datosDeLaPeliculaAEnviar = {
      id: this.pelicula.imdbID,
      descripcion: this.pelicula.description
    }
    this.guardarDescripcionEmitter.emit(datosDeLaPeliculaAEnviar)
  }
}
