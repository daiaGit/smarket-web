import { SharedModule } from './../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';

import { RegisterConsumidorComponent } from './register-consumidor.component';

export const routes = [
  { path: '', component: RegisterConsumidorComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(routes),
    NgxMaskModule
  ],
  declarations: [
    RegisterConsumidorComponent
  ]
})
export class RegisterConsumidorModule { }
