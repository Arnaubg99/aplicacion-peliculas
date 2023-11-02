import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    NotificacionComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    NotificacionComponent,
    NavbarComponent
  ]
})
export class ComponentesGlobalesModule { }
