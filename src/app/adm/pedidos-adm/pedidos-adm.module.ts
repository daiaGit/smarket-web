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

import { PedidosAdmDetailsComponent } from './pedidos-adm-details/pedidos-adm-details.component';
import { PedidosAdmStatusComponent } from './pedidos-adm-status/pedidos-adm-status.component';
import { PedidosAdmComponent } from './pedidos-adm.component';

export const routes = [
  { path: '', component: PedidosAdmComponent, pathMatch: 'full' },
  { path: 'pedidos-details', component: PedidosAdmDetailsComponent, data: { breadcrumb: 'Pedidos Detalhes' } },
  { path: 'pedidos-status', component: PedidosAdmStatusComponent, data: { breadcrumb: 'Pedidos Status' } }
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
    PedidosAdmComponent,
    PedidosAdmStatusComponent,
    PedidosAdmDetailsComponent
  ]
})
export class PedidosAdmModule { }


