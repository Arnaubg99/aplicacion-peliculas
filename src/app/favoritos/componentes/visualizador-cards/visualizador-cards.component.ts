import { Component, HostListener, Input } from '@angular/core';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
@Component({
  selector: 'app-visualizador-cards',
  templateUrl: './visualizador-cards.component.html',
  styleUrls: ['./visualizador-cards.component.css']
})
export class VisualizadorCardsComponent {
  @Input() datosRecibidos!:DetallesPelicula[];
  @Input() filtroTexto!:string;

  public numeroDeCards:number = 4
  public paginaActual:number = 1

  ngOnInit():void {
    let ancho_pantalla:number = window.innerWidth;
    if(ancho_pantalla > 950 && ancho_pantalla < 1250){
      this.numeroDeCards = 3
    }
    else if(ancho_pantalla > 650 && ancho_pantalla < 950){
      this.numeroDeCards = 2
    }
    else if(ancho_pantalla < 650){
      this.numeroDeCards = 1
    }
    else{
      this.numeroDeCards = 4
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth > 950 && event.target.innerWidth < 1250){
      this.numeroDeCards = 3
    }
    else if(event.target.innerWidth > 650 && event.target.innerWidth < 950){
      this.numeroDeCards = 2
    }
    else if(event.target.innerWidth < 650){
        this.numeroDeCards = 1
    }
    else{
      this.numeroDeCards = 4
    }
  }
}
