import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componentes-globales/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms';
import { NotificacionComponent } from './componentes-globales/notificacion/notificacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotificacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
