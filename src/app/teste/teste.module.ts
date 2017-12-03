import { SharedModule } from './../shared/shared.module';
import { TesteComponent } from './teste.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

export const routes = [
  { path: '', component: TesteComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PerfectScrollbarModule
  ],
  declarations: [
    TesteComponent
  ]
})

export class TesteModule { }
