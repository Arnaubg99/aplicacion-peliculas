import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { DirectivasModule } from '../directivas/directivas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardComponent } from './componentes/card/card.component';
import { FavoritosComponent } from './paginas/favoritos/favoritos.component';
import { DetallesComponent } from './paginas/detalles/detalles.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { VisualizadorCardsComponent } from './componentes/visualizador-cards/visualizador-cards.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltrosPipe } from '../pipes/filtros.pipe';


@NgModule({
  declarations: [
    FavoritosComponent,
    CardComponent,
    DetallesComponent,
    VisualizadorCardsComponent,
    FiltrosPipe
  ],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    DirectivasModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgxPaginationModule
  ],
})
export class FavoritosModule { }
