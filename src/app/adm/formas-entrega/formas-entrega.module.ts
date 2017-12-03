import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { Ng2CompleterModule } from "ng2-completer";
import { IonRangeSliderModule } from "ng2-ion-range-slider";

/** Componentes */
import { FormasEntregaComponent } from './formas-entrega.component';

export const routes = [
  { path: '', component: FormasEntregaComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule,
    NgxMaskModule,
    Ng2CompleterModule,
    IonRangeSliderModule    
  ],
  declarations: [
    FormasEntregaComponent
  ]
})

export class FormasEntregaModule { }


