import { TooltipModule } from 'ngx-tooltip';
import { PedidosSmarketDetailsComponent } from './pedidos-smarket-details/pedidos-smarket-details.component';
import { PedidosSmarketComponent } from './pedidos-smarket.component';
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

export const routes = [
  { path: '', component: PedidosSmarketComponent, pathMatch: 'full' },
  { path: 'pedidos-smarket-details', component: PedidosSmarketDetailsComponent, data: { breadcrumb: 'Detalhes do Pedido' } }
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
    TranslateModule,
    TooltipModule
  ],
  declarations: [
    PedidosSmarketComponent,
    PedidosSmarketDetailsComponent
  ]
})
export class PedidosSmarketModule { }


