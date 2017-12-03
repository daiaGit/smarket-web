import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/** Componentes */
import { HeaderAdmComponent } from './../theme/components/header-adm/header-adm.component';
import { AdmComponent } from './adm.component';

/** Rotas */
import { routing } from './adm.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    ToastrModule.forRoot(),
    NgbModule.forRoot(), 
    routing
  ],
  declarations: [
    HeaderAdmComponent,
    AdmComponent
  ]
})
export class AdmModule { }
