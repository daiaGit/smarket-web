import { TranslateModule } from 'ng2-translate/ng2-translate';
import { HeaderShopComponent } from './../theme/components/header-shop/header-shop.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './shop.routing';
import { ShopComponent } from './shop.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';
import { HorizontalMenuComponent } from './../theme/components/menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './../theme/components/menu/vertical-menu/vertical-menu.component';
import { ToastrModule } from 'ngx-toastr';

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
    HeaderShopComponent,
    ShopComponent
  ]
})
export class ShopModule { }
