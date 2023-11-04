import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getDatos(ruta:string):string {
    return localStorage.getItem(ruta) || '[]'
  }

  public agregarDatos(ruta:string, valor:string):void {
    localStorage.setItem(ruta, valor)
  }
}
