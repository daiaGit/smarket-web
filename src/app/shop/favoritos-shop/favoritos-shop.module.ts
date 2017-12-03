
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FavoritosShopComponent } from './favoritos-shop.component';

export const routes = [
  { path: '', component: FavoritosShopComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    FavoritosShopComponent
  ]
})

export class FavoritosShopModule { }
