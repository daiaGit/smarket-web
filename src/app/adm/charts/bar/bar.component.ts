import { IndicativosService } from './../../../services/indicativo.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { single, multi } from './../charts.data';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    IndicativosService
  ],
})
export class BarComponent {

  public single: any[];
  public multi: any[];
  public indicativos: any[];
  public grafico: any[];
  public erros: any[];   

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Country';
  public showYAxisLabel = true;
  public yAxisLabel = 'Population';
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };

  constructor(
    public indicativosService: IndicativosService
  ) {
    Object.assign(this, {single, multi}); 
    this.listarIndicativo();
  }
  
  public onSelect(event) {
    console.log(event);
  }

  
  listarIndicativo() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var teste: any = {
      name: '',
      value: ''
    };

    this.indicativosService.getFaturamentoPorMes().subscribe(
      indicativos=> {
        resp = indicativos['response'];
        if (resp.status == 'true') {
          this.indicativos = resp.objeto;
   
        }
        else {
          msgErro.item = 'Erro ao carregar as formas de entrega!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {

        msgErro.item = 'Erro ao carregar as formas de entrega!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

}
