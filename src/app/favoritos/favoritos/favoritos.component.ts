import { Component, inject, AfterContentInit, ViewChild } from '@angular/core';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements AfterContentInit {
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);
  public arrayPeliculasFavoritasMap!: MatTableDataSource<any>;

  public arrayPeliculasFavoritas!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterContentInit(){
    this.arrayPeliculasFavoritasMap = new MatTableDataSource(this.peliculasFavoritasService.getArrayPeliculasFavoritas);
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
    this.arrayPeliculasFavoritasMap.paginator = this.paginator;

  }

  ngAfterViewInit() {
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
    this.arrayPeliculasFavoritasMap.paginator = this.paginator;
  }
 }

