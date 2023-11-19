import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Directive({
  selector: '[appImagenError]'
})
export class ImagenErrorDirective {
  private elementoImg:ElementRef;

  constructor(){
    this.elementoImg = inject(ElementRef);
  }

  @HostListener('error')
  onError():void {
    this.elementoImg.nativeElement.src = environment.IMAGEN_NO_ENCONTRADA_URL
  }
}
