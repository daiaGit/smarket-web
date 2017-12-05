import { LoadingBarService } from '@ngx-loading-bar/core';
import { IndicativosService } from './../../services/indicativo.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.scss'],
  providers:[
    IndicativosService,
    LoadingBarService
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdmComponent  {
  
  public router: Router;
  public erros: Array<any> = [];

  public pedidosUltimoMes: any;
  public faturamentoPorMes: any;
  public faturamentoPorEstabelecimento: Array<any> = [];

  constructor(router: Router,
    public indicativosService: IndicativosService,
    private loadingBar: LoadingBarService
  ) {

    this.router = router;

  }

  ngOnInit() {
    this.getPedidosUltimoMes();
    this.getFaturamentoPorMes();
    this.getFaturamentoPorEstabelecimento()
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
          console.log();
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
  
  public verPedidos() {
    this.router.navigate(['/adm/pedidos-adm']);
  }

  public verLotes() {
    this.router.navigate(['/adm/lotes-adm']);
  }

  public verProdutos() {
    this.router.navigate(['/adm/produtos-adm']);
  }

  public verFuncionarios() {
    this.router.navigate(['/adm/funcionarios-adm']);
  }


}
