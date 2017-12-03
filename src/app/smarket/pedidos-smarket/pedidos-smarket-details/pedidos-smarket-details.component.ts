import { EstabelecimentoService } from 'app/services/estabelecimento.service';
import { ConsumidorService } from 'app/services/consumidor.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

/** Services */
import { MarcaService } from './../../../services/marca.service';
import { ProdutoService } from './../../../services/produto.service';
import { SubcategoriaService } from './../../../services/subcategoria.service';
import { CategoriaService } from './../../../services/categoria.service';
import { CargoService } from './../../../services/cargo.service';
import { TipoTelefoneService } from './../../../services/tipos-telefone.service';
import { EstabelecimentoAdmBancarioComponent } from 'app/adm/estabelecimento-adm/estabelecimento-adm-bancario/estabelecimento-adm-bancario.component';

@Component({
  selector: 'app-pedidos-smarket-details',
  templateUrl: './pedidos-smarket-details.component.html',
  styleUrls: ['./pedidos-smarket-details.component.scss'],
  providers: [
    ConsumidorService,
    EstabelecimentoService
  ],
  encapsulation: ViewEncapsulation.None
})
export class PedidosSmarketDetailsComponent implements OnInit {
  
  public router: Router;
  public form: FormGroup;
  public sucessos: Array<any> = [];
  public erros: Array<any> = [];

  public image: any;

  public pedido: any = null;

  public consumidor: any = null;
  public estabelecimento: any = null;

  constructor(router: Router,
    public consumidorService: ConsumidorService,
    public estabelecimentoService: EstabelecimentoService
  ) {

    this.router = router;

  }

  ngOnInit() {
    if (localStorage.getItem('pedido')) {
      this.pedido = JSON.parse(localStorage.getItem('pedido'));
      localStorage.removeItem('pedido');
      this.getConsumidor();
    }
  }

  public onSubmit(values: Object): void {

  }

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  public getEstabelecimento(): void {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.estabelecimentoService.getEstabelecimentoVendedorSmarket(this.pedido.pedido.estabelecimento_id).subscribe(
      estabelecimento => {
        resp = estabelecimento['response'];
        if (resp['status'] == 'true') {
          this.estabelecimento = resp.objeto;
        }
        else {
          msgErro.item = 'Erro ao carregar informaçoes do estabelecimento!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar informaçoes do estabelecimento!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public getConsumidor(): void {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.consumidorService.getConsumidor(this.pedido.pedido.usuario_id, this.pedido.pedido.tipo_usuario_id).subscribe(
      cliente => {
        resp = cliente['response'];
        if (resp['status'] == 'true') {
          this.consumidor = resp.objeto;
        }
        else {
          msgErro.item = 'Erro ao carregar informaçoes do consumidor!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar informaçoes do consumidor!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

}

