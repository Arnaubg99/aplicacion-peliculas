import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly HTTP_CLIENT:HttpClient = inject(HttpClient)

  public buscarPeliculas(parametro_busqueda:string): Observable<any>{
    return this.HTTP_CLIENT.get(`${environment.API_URL}${parametro_busqueda}&apikey=${environment.API_KEY}`).pipe(
      catchError(error =>{
        throw new Error(`Something went wrong: ${error}`);
      })
    );
  }

}
