import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedefinirSenhaComponent } from './redefinir-senha.component';

export const routes = [
  { 
    path: '', 
    component: RedefinirSenhaComponent, 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RedefinirSenhaComponent
  ]
})

export class RedefinirSenhaModule { }
