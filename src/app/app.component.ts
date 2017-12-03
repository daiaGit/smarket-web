import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import {TranslateService} from 'ng2-translate/ng2-translate';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    public settings: Settings;

    constructor( public appSettings: AppSettings,
                 public translate: TranslateService) {
        this.settings = this.appSettings.settings;

        translate.addLangs(['en', 'fr', 'pt-BR', 'es']);
        translate.setDefaultLang('pt-BR');
 
        const browserLang: string = translate.getBrowserLang();
    
        translate.use(browserLang.match(/en|pt-BR|es|fr/) ? browserLang : 'pt-BR');
    }

}
