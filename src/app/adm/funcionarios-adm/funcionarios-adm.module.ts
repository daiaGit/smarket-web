import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';


import { FuncionariosAdmComponent } from './funcionarios-adm.component';
import { FuncionariosCreateComponent } from './funcionarios-create/funcionarios-create.component';
import { FuncionariosEditComponent } from './funcionarios-edit/funcionarios-edit.component';

export const routes = [
  { path: '', component: FuncionariosAdmComponent, pathMatch: 'full' },
  { path: 'funcionarios-create', component: FuncionariosCreateComponent, data: { breadcrumb: 'Cadastrar' } },
  { path: 'funcionarios-edit', component: FuncionariosEditComponent, data: { breadcrumb: 'Editar' } }
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
    FuncionariosAdmComponent,
    FuncionariosCreateComponent,
    FuncionariosEditComponent
  ]
})
export class FuncionariosAdmModule { }


