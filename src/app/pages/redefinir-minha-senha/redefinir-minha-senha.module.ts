import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RedefinirMinhaSenhaComponent } from './redefinir-minha-senha.component';

export const routes = [
  { path: '', component: RedefinirMinhaSenhaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [
    RedefinirMinhaSenhaComponent
  ]
})

export class RedefinirMinhaSenhaModule {
  
 }