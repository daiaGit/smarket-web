import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';

//Services
import { EstadoService } from 'app/services/estado.service';
import { CidadeService } from 'app/services/cidade.service';
import { EstabelecimentoService } from 'app/services/estabelecimento.service';


@Component({
  selector: 'estabelecimentos-blank',
  templateUrl: './estabelecimentos-shop.component.html',
  styleUrls: ['./estabelecimentos-shop.component.scss'],
  providers:[
    EstadoService,
    CidadeService,
    EstabelecimentoService
  ],
  encapsulation: ViewEncapsulation.None
})
export class EstabelecimentosShopComponent implements OnInit {

  @ViewChild('openModal') openModal:ElementRef; 
  
  public estados:any = [];
  public cidades:any = [];
  public estabelecimentos: any=[]
  public latitude:any = '';
  public longitude:any = '';

  //ng-model
  public estado:any = '';
  public cidade:any = ''; 


  
  constructor(
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public estabelecimentoService: EstabelecimentoService
  ) { }

  ngOnInit() { 
    this.openModal.nativeElement.click();
    this.listarEstados();
   }

   public listarEstados() {
    var msgErro: any = {
        item : '',
        descricao: ''
    };

    this.estadoService.listarTodos().subscribe(
        estados => {
            console.log(estados);
            this.estados = estados['estados'];
        },
        err => {
            msgErro.item = 'Erro ao listar Estados!';
            msgErro.descricao = err;
        }
    );
  }


  public listarCidades() {
      var msgErro: any = {
          item : '',
          descricao: ''
      };

      this.cidadeService.listarTodos(this.estado).subscribe(
          cidades => {
              this.cidades = cidades['cidades'];
          },
          err => {
              msgErro.item = 'Erro ao listar Cidades!';
              msgErro.descricao = err;
          });
  }

  public buscarCoordenadasPorCidade() {
    var msgErro: any = {
        item : '',
        descricao: ''
    };
    var resp:any;

    this.cidadeService.getCoordenadaPorCidade(this.cidade).subscribe(
        coordenadas => {
          resp = coordenadas['response'];
          this.latitude = resp['objeto'][0].cidade_latitude;
          this.longitude = resp['objeto'][0].cidade_longitude;
        },
        err => {
            msgErro.item = 'Erro ao listar Cidades!';
            msgErro.descricao = err;
        });
  }

  public getEstabelecimentoByLocalidade(){
    var msgErro: any = {
      item : '',
      descricao: ''
    };
    var resp:any;

    this.estabelecimentoService.getEstabelecimentoByLocalidade(this.latitude,this.longitude).subscribe(
      estabelecimentos => {
        resp = estabelecimentos['response'];
        this.estabelecimentos = resp['objeto'];
        console.log(this.estabelecimentos);
      },
      err => {
          msgErro.item = 'Erro ao listar Cidades!';
          msgErro.descricao = err;
      });

  }

}
