import { DashboardSmarketZeroComponent } from './dashboard-smarket-zero.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

export const routes = [
  { path: '', component: DashboardSmarketZeroComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    DashboardSmarketZeroComponent
  ]
})

export class DashboardSmarketZeroModule { }
