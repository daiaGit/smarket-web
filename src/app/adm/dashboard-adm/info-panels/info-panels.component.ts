import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { IndicativosService } from './../../../services/indicativo.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-info-panels',
  templateUrl: './info-panels.component.html',
  providers: [
    IndicativosService,
    LoadingBarService
  ],
  encapsulation: ViewEncapsulation.None
})
export class InfoPanelsComponent {


  public router: Router;
  public erros: Array<any> = [];

  public pedidosUltimoMes: any;
  public faturamentoPorMes: any;
  public faturamentoPorEstabelecimento: any;

  public previousShowMenuOption: boolean;
  public previousMenuOption: string;
  public previousMenuTypeOption: string;
  public settings: Settings;

  public sales = [{ name: 'sales', value: 0.81, extra: { format: 'percent' } }];
  public salesBgColor = { domain: ['#2F3E9E'] };

  public likes = [{ name: 'likes', value: 47588 }];
  public likesBgColor = { domain: ['#D22E2E'] };

  public downloads = [{ name: 'downloads', value: 189730 }];
  public downloadsBgColor = { domain: ['#378D3B'] };

  public profit = [{ name: 'profit', value: 52470, extra: { format: 'currency' } }];
  public profitBgColor = { domain: ['#0096A6'] };

  public messages = [{ name: 'messages', value: 75296 }];
  public messagesBgColor = { domain: ['#606060'] };

  public members = [{ name: 'members', value: 216279 }];
  public membersBgColor = { domain: ['#F47B00'] };

  public lucroPf = [{ name: 'FATURAMENTO PF', value: 0, extra: { format: 'currency' } }];
  public lucroPfBgColor = { domain: ['#0096A6'] };

  public lucroPj = [{ name: 'FATURAMENTO PJ', value: 0, extra: { format: 'currency' } }];
  public lucroPjBgColor = { domain: ['#0096A6'] };

  public pedidosPf = [{ name: 'PEDIDOS PF', value: 0}];
  public pedidosPfBgColor = { domain: ['#0096A6'] };

  public pedidosPj = [{ name: 'PEDIDOS PJ', value: 0}];
  public pedidosPjBgColor = { domain: ['#0096A6'] };

  constructor(public appSettings: AppSettings,
    router: Router,
    public indicativosService: IndicativosService,
    private loadingBar: LoadingBarService) {
    this.settings = this.appSettings.settings;
    this.initPreviousSettings();
    this.router = router;
  }

  ngOnInit() {
    this.getPedidosUltimoMes();
    this.getFaturamentoPorMes();
    this.getFaturamentoPorEstabelecimento();
  }

  public infoLabelFormat(c): string {
    switch (c.data.name) {
      case 'sales':
        return `<i class="fa fa-shopping-cart mr-2"></i>${c.label}`;
      case 'likes':
        return `<i class="fa fa-thumbs-o-up mr-2"></i>${c.label}`;
      case 'downloads':
        return `<i class="fa fa-download mr-2"></i>${c.label}`;
      case 'profit':
        return `<i class="fa fa-money mr-2"></i>${c.label}`;
      case 'messages':
        return `<i class="fa fa-comment-o mr-2"></i>${c.label}`;
      case 'members':
        return `<i class="fa fa-user mr-2"></i>${c.label}`;
      default:
        return c.label;
    }
  }

  public infoValueFormat(c): string {
    switch (c.data.extra ? c.data.extra.format : '') {
      case 'currency':
        return `\$${Math.round(c.value).toLocaleString()}`;
      case 'percent':
        return `${Math.round(c.value * 100)}%`;
      default:
        return c.value.toLocaleString();
    }
  }

  public onSelect(event) {
    console.log(event);
  }

  public ngDoCheck() {
    if (this.checkAppSettingsChanges()) {
      setTimeout(() => this.sales = [...this.sales]);
      setTimeout(() => this.likes = [...this.likes]);
      setTimeout(() => this.downloads = [...this.downloads]);
      setTimeout(() => this.profit = [...this.profit]);
      setTimeout(() => this.messages = [...this.messages]);
      setTimeout(() => this.members = [...this.members]);
      this.initPreviousSettings();
    }
  }

  public checkAppSettingsChanges() {
    if (this.previousShowMenuOption != this.settings.theme.showMenu ||
      this.previousMenuOption != this.settings.theme.menu ||
      this.previousMenuTypeOption != this.settings.theme.menuType) {
      return true;
    }
    return false;
  }

  public initPreviousSettings() {
    this.previousShowMenuOption = this.settings.theme.showMenu;
    this.previousMenuOption = this.settings.theme.menu;
    this.previousMenuTypeOption = this.settings.theme.menuType;
  }

  getPedidosUltimoMes() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.indicativosService.getPedidosUltimoMes().subscribe(
      pedidosUltimoMes => {
        resp = pedidosUltimoMes['response'];
        if (resp.status == 'true') {
          this.pedidosUltimoMes = resp.objeto;
          console.log(this.pedidosUltimoMes);
        }
        else {
          msgErro.item = 'Erro ao carregar indicativo de ultimos pedidos do mês!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar indicativo de ultimos pedidos do mês!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  getFaturamentoPorMes() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.indicativosService.getFaturamentoPorMes().subscribe(
      faturamentoPorMes => {
        resp = faturamentoPorMes['response'];
        if (resp.status == 'true') {
          this.faturamentoPorMes = resp.objeto;
          console.log(this.faturamentoPorMes);
        }
        else {
          msgErro.item = 'Erro ao carregar indicativo de faturamento por mês!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar indicativo de faturamento por mês!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  getFaturamentoPorEstabelecimento() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.indicativosService.getFaturamentoPorEstabelecimento().subscribe(
      faturamentoPorEstabelecimento => {
        resp = faturamentoPorEstabelecimento['response'];
        if (resp.status == 'true') {
          this.faturamentoPorEstabelecimento = resp.objeto;

          this.lucroPf[0].value =  this.faturamentoPorEstabelecimento[0].total_lucro;
          this.lucroPj[0].value =  this.faturamentoPorEstabelecimento[1].total_lucro;
          this.pedidosPf[0].value =  this.faturamentoPorEstabelecimento[0].total_pedidos;
          this.pedidosPj[0].value =  this.faturamentoPorEstabelecimento[1].total_pedidos;

        }
        else {
          msgErro.item = 'Erro ao carregar indicativo de faturamento por estabelecimento!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar indicativo de faturamento por estabelecimento!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

}
