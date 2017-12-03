import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha.component';


export const routes = [
  { path: '', component: EsqueciMinhaSenhaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [EsqueciMinhaSenhaComponent]
})

export class EsqueciMinhaSenhaModule {
  
 }