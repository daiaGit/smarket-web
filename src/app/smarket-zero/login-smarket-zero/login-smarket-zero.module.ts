
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginSmarketZeroComponent } from './login-smarket-zero.component';

export const routes = [
  { path: '', component: LoginSmarketZeroComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [LoginSmarketZeroComponent]
})

export class LoginSmarketZeroModule {
  
 }