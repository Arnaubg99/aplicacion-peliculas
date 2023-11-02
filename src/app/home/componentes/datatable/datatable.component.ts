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
  @Input() datosRecibidos!: Pelicula[];
  @Input() error!: string;

  @Output() enviarPeliculaIdEmit = new EventEmitter();
  public datosMostradosEnTabla: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(){
    this.datosMostradosEnTabla = new MatTableDataSource<any>(this.datosRecibidos);
    this.datosMostradosEnTabla.paginator = this.paginator;
  }

  public enviarPeliculaId(pelicula_id:string){
    this.enviarPeliculaIdEmit.emit(pelicula_id)
  }

}
