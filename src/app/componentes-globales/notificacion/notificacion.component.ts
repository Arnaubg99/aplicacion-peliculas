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

  ngOnInit() {
    this.notificacionService.notificacion$.subscribe(
      mensaje => {
        this.notificacion = mensaje;
        setTimeout(() => {
          this.notificacion = '';
        }, 5000);
      }
    );
  }
}
