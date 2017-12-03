
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProdutosShopComponent } from './produtos-shop.component';
import { DetalheProdutoShopComponent } from './detalhe-produto-shop/detalhe-produto-shop.component';

export const routes = [
  { path: '', component: ProdutosShopComponent, pathMatch: 'full' },
  { path: 'detalhe-produto-shop', component: DetalheProdutoShopComponent, data: { breadcrumb: 'Detalhe Produto' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    ProdutosShopComponent,
    DetalheProdutoShopComponent
  ]
})

export class ProdutosShopModule { }
