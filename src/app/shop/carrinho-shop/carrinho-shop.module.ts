
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CarrinhoShopComponent } from './carrinho-shop.component';

export const routes = [
  { path: '', component: CarrinhoShopComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    CarrinhoShopComponent
  ]
})

export class CarrinhoShopModule { }
