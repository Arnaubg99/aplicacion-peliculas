import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { DirectivasModule } from '../directivas/directivas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardComponent } from './componentes/card/card.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FavoritosComponent } from './paginas/favoritos/favoritos.component';
import { DetallesComponent } from './paginas/detalles/detalles.component';
import { ModalFiltrosComponent } from './componentes/modal-filtros/modal-filtros.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    FavoritosComponent,
    CardComponent,
    DetallesComponent,
    ModalFiltrosComponent,
  ],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    DirectivasModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
})
export class FavoritosModule { }
