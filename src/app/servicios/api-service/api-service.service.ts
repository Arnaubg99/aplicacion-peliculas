import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/modelos/pelicula.model';
import { arrayPeliculas } from 'src/app/modelos/arrayPeliculas.model';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly HTTP_CLIENT= inject(HttpClient);

  // getPeliculas(titulo:string): Observable<Object>{
  //   return this.HTTP_CLIENT.get<arrayPeliculas>(`${environment.API_URL}s=${titulo}&apikey=${environment.API_KEY}`)
  // }
  hola(): void{
    console.log(environment.API_KEY, environment.API_URL)
  }
}
