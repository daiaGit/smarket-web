import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';

import { EstabelecimentosShopComponent } from './../estabelecimentos-shop/estabelecimentos-shop.component';

export const routes = [
  { path: '', component: EstabelecimentosShopComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    FormsModule
  ],
  declarations: [
    EstabelecimentosShopComponent
  ]
})

export class EstabelecimentosShopModule { }
