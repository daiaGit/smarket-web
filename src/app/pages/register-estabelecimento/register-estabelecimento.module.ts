/** Angular */
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';

/** Component */
import { RegisterEstabelecimentoComponent } from './register-estabelecimento.component';

export const routes = [
  { path: '', component: RegisterEstabelecimentoComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(routes),
    NgxMaskModule
  ],
  declarations: [
    RegisterEstabelecimentoComponent
  ]
})
export class RegisterEstabelecimentoModule { }
