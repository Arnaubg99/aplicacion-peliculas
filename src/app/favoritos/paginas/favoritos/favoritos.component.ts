import { Component, inject, AfterContentInit, ViewChild, HostListener } from '@angular/core';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent  {
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);
  public arrayPeliculasFavoritasMap!: MatTableDataSource<any>;

  public arrayPeliculasFavoritas!: any;

  public numeroDeCartas: number = 4

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth < 1250){
      this.numeroDeCartas = 3
      this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
      this.arrayPeliculasFavoritasMap.paginator = this.paginator;
    }
    if(event.target.innerWidth < 950){
      this.numeroDeCartas = 2
      this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
      this.arrayPeliculasFavoritasMap.paginator = this.paginator;
    }
    if(event.target.innerWidth < 650){
      this.numeroDeCartas = 1
      this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
      this.arrayPeliculasFavoritasMap.paginator = this.paginator;
    }
  }


  ngOnInit(){
    let ancho_pantalla = window.innerWidth;
    if(ancho_pantalla < 1250){
      this.numeroDeCartas = 3
    }
    if(ancho_pantalla < 950){
      this.numeroDeCartas = 2
    }
    if(ancho_pantalla < 650){
      this.numeroDeCartas = 1
    }else{
      this.numeroDeCartas = 4
    }

    let peliculas_favoritas = this.peliculasFavoritasService.getArrayPeliculasFavoritas
    this.arrayPeliculasFavoritasMap = new MatTableDataSource(peliculas_favoritas);
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
    this.arrayPeliculasFavoritasMap.paginator = this.paginator;
  }


  ngAfterViewInit() {
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
    this.arrayPeliculasFavoritasMap.paginator = this.paginator;
  }


  public filtrar(parametros_filtraje: object){
    let peliculas_filtradas = this.peliculasFavoritasService.filtrarPeliculasDeFavoritos(parametros_filtraje)
    this.arrayPeliculasFavoritasMap = new MatTableDataSource(peliculas_filtradas);
    this.arrayPeliculasFavoritas = this.arrayPeliculasFavoritasMap.connect();
    this.arrayPeliculasFavoritasMap.paginator = this.paginator;

  }
 }

