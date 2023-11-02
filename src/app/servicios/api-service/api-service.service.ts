import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DetallesPelicula } from 'src/app/modelos/detalles-pelicula.model';
import { Pelicula } from 'src/app/modelos/pelicula.model';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly HTTP_CLIENT= inject(HttpClient)

  buscarPeliculas(parametro_busqueda:string): Observable<any>{
    return this.HTTP_CLIENT.get(`${environment.API_URL}${parametro_busqueda}&apikey=${environment.API_KEY}`)
  }
}
