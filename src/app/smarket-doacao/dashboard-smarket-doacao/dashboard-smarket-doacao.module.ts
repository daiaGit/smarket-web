import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardSmarketDoacaoComponent } from './dashboard-smarket-doacao.component';

export const routes = [
  { path: '', component: DashboardSmarketDoacaoComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    DashboardSmarketDoacaoComponent
  ]
})

export class DashboardSmarketDoacaoModule { }
