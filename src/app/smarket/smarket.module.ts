import { HeaderSmarketComponent } from './../theme/components/header-smarket/header-smarket.component';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TooltipModule} from "ngx-tooltip";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { routing } from './smarket.routing';
import { SmarketComponent } from './smarket.component';

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
    SmarketComponent,
    HeaderSmarketComponent
  ]
})
export class SmarketModule { }
