import { HeaderComponent } from './../theme/components/header/header.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { routing } from './pages.routing';

import { SearchComponent } from './search/search.component';
import { PagesComponent } from './pages.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    routing
  ],
  declarations: [
    HeaderComponent,
    PagesComponent,
    SearchComponent
  ]
})
export class PagesModule { }
