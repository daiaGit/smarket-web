import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EstabelecimentoService } from 'app/services/estabelecimento.service';
import { CidadeService } from 'app/services/cidade.service';
import { EntregaService } from 'app/services/entrega.service';


/** Services */


@Component({
  selector: 'app-formas-entrega',
  templateUrl: './formas-entrega.component.html',
  styleUrls: ['./formas-entrega.component.scss'],
  providers: [
    EstabelecimentoService,
    CidadeService,
    EntregaService
  ],
  encapsulation: ViewEncapsulation.None
})

export class FormasEntregaComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public sucessos: Array<any> = [];
  public erros: Array<any> = [];

  public estabelecimento: any;
  public cidade: any;
  public formasEntrega: Array<any> = [];

  public entrega_frete: AbstractControl;
  public entrega_loja: AbstractControl;

  public exibir_fretes: boolean = true;

  constructor(router: Router,
    fb: FormBuilder,
    public estabelecimentoService: EstabelecimentoService,
    public cidadeService: CidadeService,
    public entregaService: EntregaService
  ) {
    this.router = router;

    this.form = fb.group({
      entrega_frete: [''],
      entrega_loja: ['']
    });

    this.entrega_frete = this.form.controls['entrega_frete'];
    this.entrega_loja = this.form.controls['entrega_loja'];

  }

  ngOnInit() {
    this.listarFormasEntrega();
    this.listarEstabelecimentoVendedor();
  }

  atualizaFormaEntrega(value, idFormaEntrega) {

    console.log(value);
    console.log(idFormaEntrega);

    if (value == true) {
      this.adicionarFormaEntrega(idFormaEntrega);
    }
    else {
      this.removerFormaEntrega(idFormaEntrega);
    }
  }

  public adicionarFormaEntrega(idFormaEntrega): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    if (this.form.valid) {

      this.estabelecimentoService.setFormasEntrega(idFormaEntrega).subscribe(
        endereco => {
          resp = endereco['response'];
          if (resp.status == 'true') {
            msgSucesso.item = 'parabéns forma de entrega adicionada com sucesso!';
            msgSucesso.descricao = resp.descricao;
            this.sucessos.push(msgSucesso);
          }
          else {
            msgErro.item = 'Erro ao adicionar forma de entrega.';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao adicionar forma de entrega!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
  }

  public removerFormaEntrega(idFormaEntrega): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    this.estabelecimentoService.removeFormasEntrega(idFormaEntrega).subscribe(
      endereco => {
        resp = endereco['response'];
        if (resp.status == 'true') {
          msgSucesso.item = 'parabéns forma de entrega removida com sucesso!';
          msgSucesso.descricao = resp.descricao;
          this.sucessos.push(msgSucesso);
        }
        else {
          msgErro.item = 'Erro ao remover as forma de entrega.';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao remover forma de entrega!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  public closeAlertSucesso(index) {
    this.sucessos.splice(index, 1);
  }

  myOnChange(teste) {

  }

  myOnFinish(teste) {
    console.log(teste);
  }

  myOnUpdate(teste) {

  }

  listarFormasEntrega() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.entregaService.getEntregaByEstabelecimento().subscribe(
      formasEntrega => {
        resp = formasEntrega['response'];
        if (resp.status == 'true') {
          this.formasEntrega = resp.objeto;
          for (var v in this.formasEntrega) {
            if (this.formasEntrega[v].tipo_entrga_id == 1) {
              this.entrega_frete.setValue(true);
            }
            if (this.formasEntrega[v].tipo_entrga_id == 2) {
              this.entrega_loja.setValue(true);
            }
          }
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

  listarEstabelecimentoVendedor() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.estabelecimentoService.getEstabelecimentoVendedor().subscribe(
      estabelecimento => {

        resp = estabelecimento['response'];
        if (resp.status == 'true') {
          this.estabelecimento = resp.objeto;
        }
        else {
          msgErro.item = 'Erro ao carregar endereço do estabelecimento!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {

        msgErro.item = 'Erro ao carregar endereço do estabelecimento!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

}

