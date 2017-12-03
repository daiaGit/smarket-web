
import { TranslateModule } from 'ng2-translate/ng2-translate';
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

import { ConsumidoresSmarketDetailsComponent } from './consumidores-smarket-details/consumidores-smarket-details.component';
import { ConsumidoresSmarketComponent } from './consumidores-smarket.component';

export const routes = [
  { path: '', component: ConsumidoresSmarketComponent, pathMatch: 'full' },
  { path: 'consumidores-smarket-details', component: ConsumidoresSmarketDetailsComponent, data: { breadcrumb: 'Consumidor Detalhes' } }
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
    TranslateModule
  ],
  declarations: [
    ConsumidoresSmarketComponent,
    ConsumidoresSmarketDetailsComponent
  ]
})
export class ConsumidoresSmarketModule { }


