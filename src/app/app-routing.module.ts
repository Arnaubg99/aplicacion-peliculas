import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./home/home.module').then(modulo => modulo.HomeModule),
    title: 'Inicio'
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then(modulo => modulo.FavoritosModule),
    title: 'Películas favoritos'
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
