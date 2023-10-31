import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritosRoutingModule } from './favoritos-routing.module';
import { DirectivasModule } from '../directivas/directivas.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    DirectivasModule
  ],
})
export class FavoritosModule { }
