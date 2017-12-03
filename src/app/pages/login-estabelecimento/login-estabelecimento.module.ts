import { LoginEstabelecimentoComponent } from './login-estabelecimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: LoginEstabelecimentoComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginEstabelecimentoComponent]
})

export class LoginEstabelecimentoModule { }