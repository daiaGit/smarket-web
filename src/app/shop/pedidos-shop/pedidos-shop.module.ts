
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PedidosShopComponent } from './pedidos-shop.component';

export const routes = [
  { path: '', component: PedidosShopComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    PedidosShopComponent
  ]
})

export class PedidosShopModule { }
