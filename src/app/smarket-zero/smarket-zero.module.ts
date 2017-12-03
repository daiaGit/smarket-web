import { HeaderSmarketZeroComponent } from './../theme/components/header-smarket-zero/header-smarket-zero.component';
import { HeaderSmarketDoacaoComponent } from './../theme/components/header-smarket-doacao/header-smarket-doacao.component';
import { routing } from './../adm/adm.routing';
import { TranslateModule } from 'ng2-translate/ng2-translate';
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

import { SmarketZeroComponent } from './smarket-zero.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    ToastrModule.forRoot(),
    NgbModule.forRoot(), 
    routing,
    TranslateModule
  ],
  declarations: [
    HeaderSmarketZeroComponent,
    SmarketZeroComponent
  ]
})
export class SmarketZeroModule { }
