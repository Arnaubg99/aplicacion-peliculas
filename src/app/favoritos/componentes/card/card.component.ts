import { Component, Input } from '@angular/core';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pelicula!: DetallesPelicula;
}
