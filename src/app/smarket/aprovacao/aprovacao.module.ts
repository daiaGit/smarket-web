import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { AprovacaoComponent } from './aprovacao.component';

export const routes = [
  { path: '', component: AprovacaoComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    PipesModule
  ],
  declarations: [
    AprovacaoComponent
  ]
})
export class AprovacaoModule { }
