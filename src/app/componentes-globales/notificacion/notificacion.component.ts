import { Component, inject } from '@angular/core';
import { NotificacionService } from 'src/app/servicios/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent {
  private readonly notificacionService = inject(NotificacionService);
  public notificacion!: string
  public temporizadorNotificacion: any = null

  ngOnInit() {
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
