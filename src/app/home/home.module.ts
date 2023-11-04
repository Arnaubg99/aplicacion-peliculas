import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatatableComponent } from './componentes/datatable/datatable.component';
import { DirectivasModule } from '../directivas/directivas.module';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    DatatableComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    DirectivasModule,
    MatButtonModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
