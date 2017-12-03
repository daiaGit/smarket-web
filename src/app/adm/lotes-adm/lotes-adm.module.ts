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

/** Componentes */
import { LotesAdmEditComponent } from './lotes-adm-edit/lotes-adm-edit.component';
import { LotesAdmCreateComponent } from './lotes-adm-create/lotes-adm-create.component';
import { LotesAdmComponent } from './lotes-adm.component';

export const routes = [
  { path: '', component: LotesAdmComponent, pathMatch: 'full' },
  { path: 'lotes-adm-create', component: LotesAdmCreateComponent, data: { breadcrumb: 'Cadastrar' } },
  { path: 'lotes-adm-edit', component: LotesAdmEditComponent, data: { breadcrumb: 'Editar' } }
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
    Ng2CompleterModule
  ],
  declarations: [
    LotesAdmComponent,
    LotesAdmCreateComponent,
    LotesAdmEditComponent
  ]
})
export class LotesAdmModule { }


