
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MeuPerfilPFComponent } from './meu-perfil-pf.component';

export const routes = [
  { path: '', component: MeuPerfilPFComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ],
  declarations: [
    MeuPerfilPFComponent
  ]
})

export class MeuPerfilPFModule { }
