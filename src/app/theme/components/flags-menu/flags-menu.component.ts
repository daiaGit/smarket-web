import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-flags-menu',
  templateUrl: './flags-menu.component.html',
  styleUrls: ['./flags-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnInit {

  public idiomaSelecionado: any = {
    idioma: '',
    class: ''
  };
  public browserLang: string;

  constructor(public translate: TranslateService) {
    this.browserLang = this.translate.getBrowserLang();
    this.idiomaSelecionado.idioma = this.browserLang.match(/en|pt-BR|es|fr/) ? this.browserLang : 'pt-BR';
    this.idiomaSelecionado.class = "flag-icon flag-icon-" + this.idiomaSelecionado.idioma ;

    console.log(this.idiomaSelecionado);
  }

  ngOnInit() {
  }

  public alterarIdioma(idioma) {
    this.idiomaSelecionado.idioma = idioma;
    this.idiomaSelecionado.class = 'flag-icon flag-icon-' + idioma;
    this.translate.use(this.idiomaSelecionado.idioma);
  }

}

