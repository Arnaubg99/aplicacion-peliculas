import { Pipe, PipeTransform } from '@angular/core';
import { DetallesPelicula } from '../modelos/detalles-pelicula.model';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {
  transform(array:DetallesPelicula[], parametro_busqueda:string): DetallesPelicula[] {
    const filtro:string = parametro_busqueda ? parametro_busqueda.toLowerCase() : parametro_busqueda;

    if(filtro){
      return array.filter((pelicula:DetallesPelicula) => {
        return Object.values(pelicula).some(valor => {
          return String(valor).toLowerCase().includes(filtro.toLowerCase());
        });
      });
    }else{
      return array;
    }
  }
}
