import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { Pelicula } from 'src/app/modelos/pelicula.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {
  @Input() datosRecibidos: any;
  @Input() CABEZERAS_DE_LA_TABLA: string[] = [];
  @Input() error: string = ''
  @Output() enviarPeliculaIdEmit = new EventEmitter();

  public datosDeLaTabla = new MatTableDataSource<Pelicula>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.datosDeLaTabla.paginator = this.paginator;
  }

  ngOnChanges(){
    this.datosDeLaTabla.data = this.datosRecibidos;
  }

  public enviarPeliculaId(pelicula_id:string){
    this.enviarPeliculaIdEmit.emit(pelicula_id)
  }

}
