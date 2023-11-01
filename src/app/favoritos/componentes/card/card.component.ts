import { Component, Input } from '@angular/core';
import { Pelicula } from 'src/app/modelos/pelicula.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pelicula!: Pelicula;
}
