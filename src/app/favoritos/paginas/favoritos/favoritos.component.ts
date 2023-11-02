import { Component, inject, AfterContentInit, ViewChild, HostListener } from '@angular/core';
import { PeliculasFavoritasService } from 'src/app/servicios/peliculas-favoritas/peliculas-favoritas.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent  {
  private readonly peliculasFavoritasService = inject(PeliculasFavoritasService);
  private readonly notificacionService = inject(NotificacionService);

  public arrayPeliculasFavoritas!: any;

  public arrayMostrado: any

  public numeroDeCartas: number = 4

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth > 950 && event.target.innerWidth < 1250){
      this.numeroDeCartas = 3
    }
    else if(event.target.innerWidth > 650 && event.target.innerWidth < 950){
      this.numeroDeCartas = 2
    }
    else if(event.target.innerWidth < 650){
      this.numeroDeCartas = 1
    }
    else{
      this.numeroDeCartas = 4
    }
    this.arrayPeliculasFavoritas = this.arrayMostrado.connect();
    this.arrayMostrado.paginator = this.paginator;
  }

  ngOnInit(){
    let ancho_pantalla = window.innerWidth;
    if(ancho_pantalla > 950 && ancho_pantalla < 1250){
      this.numeroDeCartas = 3
    }
    else if(ancho_pantalla > 650 && ancho_pantalla < 950){
      this.numeroDeCartas = 2
    }
    else if(ancho_pantalla < 650){
      this.numeroDeCartas = 1
    }
    else{
      this.numeroDeCartas = 4
    }

    this.arrayPeliculasFavoritas = this.peliculasFavoritasService.getArrayPeliculasFavoritas
    this.iniciarPaginator()
  }


  ngAfterViewInit() {
    this.arrayPeliculasFavoritas = this.arrayMostrado.connect();
    this.arrayMostrado.paginator = this.paginator;
  }


  public eliminarPeliculaDeFavoritos(pelicula_id: string){
    this.peliculasFavoritasService.eliminarPeliculaDeFavoritos(pelicula_id)
    this.notificacionService.crearNotificacion('Movie removed from favorites');

    this.arrayPeliculasFavoritas = this.peliculasFavoritasService.getArrayPeliculasFavoritas
    this.iniciarPaginator()
  }
  public filtrar(parametros_filtraje: object){
    this.arrayPeliculasFavoritas = this.peliculasFavoritasService.filtrarPeliculasDeFavoritos(parametros_filtraje)
    this.iniciarPaginator()
  }

  public iniciarPaginator(){
    this.arrayMostrado = new MatTableDataSource(this.arrayPeliculasFavoritas);
    this.arrayPeliculasFavoritas = this.arrayMostrado.connect();
    this.arrayMostrado.paginator = this.paginator;
  }
 }

