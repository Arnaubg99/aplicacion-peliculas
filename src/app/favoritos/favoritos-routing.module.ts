import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './paginas/favoritos/favoritos.component';
import { DetallesComponent } from './paginas/detalles/detalles.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritosComponent,
    title: 'Favoritos'
  },
  {
    path: 'detalles/:id',
    component: DetallesComponent,
    title: 'Detalles'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritosRoutingModule { }
