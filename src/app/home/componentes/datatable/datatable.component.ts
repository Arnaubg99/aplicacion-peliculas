import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/modelos/pelicula.model';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {
  @Input() datosRecibidos:Pelicula[];
  @Input() error:string;
  @Output() enviarPeliculaIdEmit:EventEmitter<string>;

  public numeroDeFilas:number;
  public paginaActual:number;

  constructor(){
    this.datosRecibidos = [];
    this.error = '';
    this.enviarPeliculaIdEmit = new EventEmitter();

    this.numeroDeFilas = 4;
    this.paginaActual = 1;
  }

  public enviarPeliculaId(pelicula_id:string):void {
    this.enviarPeliculaIdEmit.emit(pelicula_id)
  }
}
