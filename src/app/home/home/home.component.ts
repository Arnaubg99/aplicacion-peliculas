import { Component, ViewChild, inject } from '@angular/core';
import { ApiServiceService } from 'src/app/servicios/api-service/api-service.service';

import { resultadoBusqueda } from 'src/app/modelos/resultadoBusqueda.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private readonly apiService = inject(ApiServiceService);
  public titulo!: string;
  public peliculas = new MatTableDataSource<resultadoBusqueda>([]);
  public readonly CABEZERAS_DE_LA_TABLA: string[] = ['Title', 'imdbID', 'Year', 'Type', 'Poster', 'Favoritos'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.peliculas.paginator = this.paginator;
  }

  public seleccionarPeliculas(){
      this.apiService.getPeliculas(this.titulo).subscribe((respuesta) => {
        if(respuesta.Search){
          this.peliculas.data = respuesta.Search;
        }else{
          this.peliculas.data = [];
        }
      })
  }

  public favoritos(peliculaId: string){
    console.log(peliculaId)
  }


}
