import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenErrorDirective } from '../directivas/imagen-error.directive';



@NgModule({
  declarations: [
    ImagenErrorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenErrorDirective
  ]
})
export class DirectivasModule { }
