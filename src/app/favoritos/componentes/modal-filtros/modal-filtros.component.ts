import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-filtros',
  templateUrl: './modal-filtros.component.html',
  styleUrls: ['./modal-filtros.component.css']
})
export class ModalFiltrosComponent {
  public parametrosFiltraje: FormGroup = new FormGroup({
    Title: new FormControl(''),
    Year: new FormControl(''),
    Released:new FormControl(''),
    Runtime: new FormControl(''),
    Genre: new FormControl(''),
    Director: new FormControl(''),
    Writer: new FormControl(''),
    Actors: new FormControl(''),
    Plot: new FormControl(''),
    Language: new FormControl(''),
    Country: new FormControl(''),
    Awards: new FormControl(''),
    imdbRating: new FormControl(''),
    Type: new FormControl(''),
  })
  public mostrarModalFiltros: boolean = false;

  @Output() parametrosFiltrajeEmitter = new EventEmitter();

  public mostrarFiltros(){
    this.mostrarModalFiltros = !this.mostrarModalFiltros;
  }
  public eliminarValoresNoValidosDeObJeto(objeto: object){
    let valores_filtrados =  Object.entries(objeto).filter(([key, value]) => value && typeof value != 'number' && typeof value != 'boolean');

    let objeto_fitrado = Object.fromEntries(valores_filtrados);

    return objeto_fitrado;
  }

  public fitrar(){
    let parametros_filtraje = this.eliminarValoresNoValidosDeObJeto(this.parametrosFiltraje.value);

    this.parametrosFiltrajeEmitter.emit(parametros_filtraje);
  }
}
