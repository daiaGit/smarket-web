
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { TodoSmarketComponent } from './todo-smarket/todo-smarket.component';
import { DiskSpaceSmarketComponent } from './disk-space-smarket/disk-space-smarket.component';
import { CostSmarketComponent } from './cost-smarket/cost-smarket.component';
import { VisitorsSmarketComponent } from './visitors-smarket/visitors-smarket.component';
import { InfoPanelsSmarketComponent } from './info-panels-smarket/info-panels-smarket.component';
import { DashboardSmarketComponent } from './dashboard-smarket.component';
import { InfoCardsSmarketComponent } from 'app/smarket/dashboard-smarket/info-cards-smarket/info-cards-smarket.component';

export const routes = [
  { path: '', component: DashboardSmarketComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PerfectScrollbarModule,
    NgxChartsModule,
    DirectivesModule
  ],
  declarations: [
    DashboardSmarketComponent,
    InfoPanelsSmarketComponent,
    VisitorsSmarketComponent,
    CostSmarketComponent,
    InfoCardsSmarketComponent,
    DiskSpaceSmarketComponent,
    TodoSmarketComponent
  ]
})

export class DashboardSmarketModule { }
