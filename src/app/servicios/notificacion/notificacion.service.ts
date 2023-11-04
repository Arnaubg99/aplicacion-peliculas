import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificacion:Subject<string> = new Subject<string>();
  public notificacion$:Observable<string> = this.notificacion.asObservable();

 crearNotificacion(message: string):void {
   this.notificacion.next(message);
 }
}
