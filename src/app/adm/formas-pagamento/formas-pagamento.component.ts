import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EstabelecimentoService } from 'app/services/estabelecimento.service';
import { PagamentoService } from 'app/services/pagamento.service';

/** Services */


@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.scss'],
  providers: [
    EstabelecimentoService,
    PagamentoService
  ],
  encapsulation: ViewEncapsulation.None
})

export class FormasPagamentoComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public sucessos: Array<any> = [];
  public erros: Array<any> = [];

  public formasPagamento: Array<any> = [];

  public pag_cartao: AbstractControl;
  public pag_boleto: AbstractControl;
  public pag_loja: AbstractControl;
  public pag_faturamento: AbstractControl;

  public exibir_fretes: boolean = true;

  constructor(router: Router,
    fb: FormBuilder,
    public estabelecimentoService: EstabelecimentoService,
    public pagamentoService: PagamentoService
  ) {
    this.router = router;

    this.form = fb.group({
      pag_cartao: ['', Validators.compose([Validators.required])],
      pag_boleto: ['', Validators.compose([Validators.required])],
      pag_loja: [''],
      pag_faturamento: ['']
    });

    this.pag_cartao = this.form.controls['pag_cartao'];
    this.pag_boleto = this.form.controls['pag_boleto'];
    this.pag_loja = this.form.controls['pag_loja'];
    this.pag_faturamento = this.form.controls['pag_faturamento'];
  }

  ngOnInit() {
    this.listarFormasPagamento();
    this.pag_cartao.setValue(true);
    this.pag_boleto.setValue(true);
  }

  public onSubmit(values: Object): void { }

  atualizaFormaPagamento(value, idFormaPagamento) {

    console.log(value);
    console.log(idFormaPagamento);

    if (value == true) {
      this.adicionarFormaPagamento(idFormaPagamento);
    }
    else {
      this.removeFormaPagamento(idFormaPagamento);
    }
  }

  public adicionarFormaPagamento(idFormaPagamento): void {
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

      this.estabelecimentoService.setFormasPagamento(idFormaPagamento).subscribe(
        endereco => {
          resp = endereco['response'];
          if (resp.status == 'true') {
            msgSucesso.item = 'parabéns forma de pagamento adicionada com sucesso!';
            msgSucesso.descricao = resp.descricao;
            this.sucessos.push(msgSucesso);
          }
          else {
            msgErro.item = 'Erro ao adicionar forma de pagamento.';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao adicionar forma de pagamento!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
  }

  public removeFormaPagamento(idFormaPagamento): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    this.estabelecimentoService.removeFormasPagamento(idFormaPagamento).subscribe(
      endereco => {
        resp = endereco['response'];
        if (resp.status == 'true') {
          msgSucesso.item = 'parabéns forma de pagamento removida com sucesso!';
          msgSucesso.descricao = resp.descricao;
          this.sucessos.push(msgSucesso);
        }
        else {
          msgErro.item = 'Erro ao remover as forma de pagamento.';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao remover forma de pagamento!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  listarFormasPagamento() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.pagamentoService.getFormasPagamentoByEstabelecimento().subscribe(
      formasPagamento => {
        resp = formasPagamento['response'];
        if (resp.status == 'true') {
          this.formasPagamento = resp.objeto;

          for (var v in this.formasPagamento) {
            if (this.formasPagamento[v].forma_pagamento_id == 4) {
              this.pag_cartao.setValue(true);
            }
            if (this.formasPagamento[v].forma_pagamento_id == 1) {
              this.pag_boleto.setValue(true);
            }
            if (this.formasPagamento[v].forma_pagamento_id == 3) {
              this.pag_loja.setValue(true);
            }
            if (this.formasPagamento[v].forma_pagamento_id == 2) {
              this.pag_faturamento.setValue(true);
            }
          }

        }
        else {
          this.adicionarFormaPagamento(4);
          this.adicionarFormaPagamento(1);
          msgErro.item = 'Erro ao carregar as formas de pagamento!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {

        msgErro.item = 'Erro ao carregar as formas de pagamento!';
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

}

