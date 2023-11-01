import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { DirectivasModule } from '../directivas/directivas.module';
import { FormsModule } from '@angular/forms'
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CardComponent } from './componentes/card/card.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    FavoritosComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    DirectivasModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class FavoritosModule { }
