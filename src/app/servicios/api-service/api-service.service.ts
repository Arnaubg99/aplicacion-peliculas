import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pelicula } from 'src/app/modelos/pelicula.model';
import { resultadoBusqueda } from 'src/app/modelos/resultadoBusqueda.model';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly HTTP_CLIENT= inject(HttpClient)
  // constructor(private HTTP_CLIENT: HttpClient){

  // }

  getPeliculas(titulo:string): Observable<any>{
    return this.HTTP_CLIENT.get(`${environment.API_URL}s=${titulo}&apikey=${environment.API_KEY}`)
  }
  hola(): void{
    console.log(environment.API_KEY, environment.API_URL)
  }
}
