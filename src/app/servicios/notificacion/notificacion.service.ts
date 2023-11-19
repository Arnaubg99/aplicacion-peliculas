import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificacion:Subject<string>;
  public notificacion$:Observable<string>;

  constructor(){
    this.notificacion = new Subject<string>();
    this.notificacion$ = this.notificacion.asObservable();
  }
 crearNotificacion(message: string):void {
   this.notificacion.next(message);
 }
}
