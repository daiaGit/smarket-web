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

@Component({
  selector: 'app-pedidos-adm-details',
  templateUrl: './pedidos-adm-details.component.html',
  styleUrls: ['./pedidos-adm-details.component.scss'],
  providers: [
    ConsumidorService
  ],
  encapsulation: ViewEncapsulation.None
})
export class PedidosAdmDetailsComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public sucessos: Array<any> = [];
  public erros: Array<any> = [];

  public image: any;

  public pedido: any = null;

  public consumidor: any = null;

  constructor(router: Router,
    public consumidorService: ConsumidorService
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

