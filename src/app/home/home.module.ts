import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { DatatableComponent } from './componentes/datatable.component';
import { DirectivasModule } from '../directivas/directivas.module';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    HomeComponent,
    DatatableComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    DirectivasModule,
    MatButtonModule
  ]
})
export class HomeModule { }
