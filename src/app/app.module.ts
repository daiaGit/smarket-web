import { Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { FacebookModule } from 'ngx-facebook';
import { Ng2CompleterModule } from "ng2-completer";

/** Services */
import { AcessoService } from './services/acesso.service';
import { HttpUtilService } from './services/http-util.service';

/** Guards */
import { DoacaoAuthGuard } from './guards/doacao-auth.guard';
import { ZeroAuthGuard } from './guards/zero-auth.guard';
import { SmarketAuthGuard } from './guards/smarket-auth.guard';
import { AdmAuthGuard } from './guards/adm-auth.guard';
import { ShopAuthGuard } from './guards/shop-auth.guard';

/** App Componentes */
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { SucessoCadastroComponent } from './pages/sucesso/sucesso-cadastro.component';
import { AtivaCadastroComponent } from './pages/ativa-cadastro/ativa-cadastro.component';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SucessoCadastroComponent,
    AtivaCadastroComponent
  ],
  imports: [

    BrowserModule,
    routing,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
  }),
    FacebookModule.forRoot(),
    BrowserAnimationsModule,
    Ng2CompleterModule
  ],
  providers: [ 
    AppSettings,
    AcessoService,
    AdmAuthGuard,
    SmarketAuthGuard,
    ZeroAuthGuard,
    DoacaoAuthGuard,
    ShopAuthGuard,
    HttpUtilService
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }
