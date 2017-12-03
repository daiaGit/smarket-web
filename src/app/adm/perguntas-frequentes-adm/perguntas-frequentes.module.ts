import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PerguntasFrequentesComponent } from './perguntas-frequentes.component';

export const routes = [
  { path: '', component: PerguntasFrequentesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    PerguntasFrequentesComponent
  ]
})

export class PerguntasFrequentesModule { }
