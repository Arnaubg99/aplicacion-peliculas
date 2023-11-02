import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private notificacion = new Subject<string>();

  public notificacion$ = this.notificacion.asObservable();

 crearNotificacion(message: string) {
   this.notificacion.next(message);
 }
}
