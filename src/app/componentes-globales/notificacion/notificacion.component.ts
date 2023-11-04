import { Component, inject } from '@angular/core';
import { NotificacionService } from 'src/app/servicios/notificacion/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent {
  private readonly notificacionService:NotificacionService = inject(NotificacionService);
  public notificacion!:string
  public temporizadorNotificacion:any

  ngOnInit():void {
    this.notificacionService.notificacion$.subscribe(
      mensaje => {
        clearTimeout(this.temporizadorNotificacion)
        this.notificacion = mensaje;
        this.temporizadorNotificacion = setTimeout(() => {
          this.notificacion = '';
        }, 3500);
      }
    );
  }
}
