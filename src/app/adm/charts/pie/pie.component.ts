import { IndicativosService } from './../../../services/indicativo.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { single, multi } from './../charts.data';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
    providers: [
    IndicativosService
  ],
  encapsulation: ViewEncapsulation.None
})
export class PieComponent {
  public erros: Array<any> = [];
  public single: any[];
  public multi: any[];

  public ultimosMeses: Array<any> = [];
 
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  }; 
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;

  public pedidosUltimoMes: any;
  public faturamentoPorMes: any;
  public faturamentoPorEstabelecimento: Array<any> = [];

  constructor( public indicativosService: IndicativosService) {
    Object.assign(this, {single});   
  }

  ngOnInit() {
    this.getPedidosUltimoMes();
    this.getFaturamentoPorMes();
    this.getFaturamentoPorEstabelecimento()
  }
  
  public onSelect(event) {
    console.log(event); 
  }


  getPedidosUltimoMes() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var grafico : any = {
      name: '',
      value: ''
    }

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
      

          for(let inygy of this.faturamentoPorMes){
            var grafico : any = {
              name: '',
              value: ''
            }

            // console.log(inygy);
            grafico.value = 300;
            grafico.name = inygy.mes;
            this.ultimosMeses.push(grafico);
            
          }
          console.log(this.ultimosMeses);
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
  

}
