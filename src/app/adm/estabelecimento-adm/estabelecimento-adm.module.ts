import { SharedModule } from './../../shared/shared.module';
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

/** Componentes */
import { EstabelecimentoAdmComponent } from './estabelecimento-adm.component';
import { EstabelecimentoAdmComercialComponent } from './estabelecimento-adm-comercial/estabelecimento-adm-comercial.component';
import { EstabelecimentoAdmEnderecoComponent } from './estabelecimento-adm-endereco/estabelecimento-adm-endereco.component';
import { EstabelecimentoAdmContatoComponent } from './estabelecimento-adm-contato/estabelecimento-adm-contato.component';
import { EstabelecimentoAdmBancarioComponent } from './estabelecimento-adm-bancario/estabelecimento-adm-bancario.component';
import { EstabelecimentoAdmPublicidadeComponent } from 'app/adm/estabelecimento-adm/estabelecimento-adm-publicidade/estabelecimento-adm-publicidade.component';


export const routes = [
  { path: '', component: EstabelecimentoAdmComponent, pathMatch: 'full' },
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
    NgxMaskModule
  ],
  declarations: [
    EstabelecimentoAdmComponent,
    EstabelecimentoAdmComercialComponent,
    EstabelecimentoAdmBancarioComponent,
    EstabelecimentoAdmContatoComponent,
    EstabelecimentoAdmEnderecoComponent,
    EstabelecimentoAdmPublicidadeComponent
  ]
})

export class EstabelecimentoAdmModule { }


