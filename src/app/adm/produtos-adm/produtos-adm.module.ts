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

import { ProdutosAdmEditComponent } from './produtos-adm-edit/produtos-adm-edit.component';
import { ProdutosAdmCreateComponent } from './produtos-adm-create/produtos-adm-create.component';
import { ProdutosAdmComponent } from './produtos-adm.component';

export const routes = [
  { path: '', component: ProdutosAdmComponent, pathMatch: 'full' },
  { path: 'produtos-create', component: ProdutosAdmCreateComponent, data: { breadcrumb: 'Cadastrar' } },
  { path: 'produtos-edit', component: ProdutosAdmEditComponent, data: { breadcrumb: 'Editar' } }
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
    ProdutosAdmComponent,
    ProdutosAdmCreateComponent,
    ProdutosAdmEditComponent
  ]
})
export class ProdutosAdmModule { }


