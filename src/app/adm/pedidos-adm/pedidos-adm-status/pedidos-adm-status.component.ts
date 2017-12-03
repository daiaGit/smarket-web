import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

/** Services */
import { PedidoService } from './../../../services/pedido.service';

@Component({
  selector: 'app-pedidos-adm-status',
  templateUrl: './pedidos-adm-status.component.html',
  styleUrls: ['./pedidos-adm-status.component.scss'],
  providers: [
    PedidoService
  ],
  encapsulation: ViewEncapsulation.None
})

export class PedidosAdmStatusComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public erros: Array<any> = [];
  public sucessos: Array<any> = [];

  public pedido: any;
  public statusAtual: any;

  public pedido_pag_pendente: AbstractControl;
  public pedido_pag_confirmado: AbstractControl;
  public pedido_separacao: AbstractControl;
  public pedido_preparado_envio: AbstractControl;
  public pedido_pedido_retirar: AbstractControl;
  public pedido_concluido: AbstractControl;
  public pedido_cancelado: AbstractControl;

  constructor(router: Router,
    fb: FormBuilder,
    public pedidoService: PedidoService
  ) {

    this.router = router;

    this.form = fb.group({
      pedido_pag_pendente: [''],
      pedido_pag_confirmado: [''],
      pedido_separacao: [''],
      pedido_preparado_envio: [''],
      pedido_pedido_retirar: [''],
      pedido_concluido: [''],
      pedido_cancelado: ['']
    });

    this.pedido_pag_pendente = this.form.controls['pedido_pag_pendente'];
    this.pedido_pag_confirmado = this.form.controls['pedido_pag_confirmado'];
    this.pedido_separacao = this.form.controls['pedido_separacao'];
    this.pedido_preparado_envio = this.form.controls['pedido_preparado_envio'];
    this.pedido_pedido_retirar = this.form.controls['pedido_pedido_retirar'];
    this.pedido_concluido = this.form.controls['pedido_concluido'];
    this.pedido_cancelado = this.form.controls['pedido_cancelado'];

  }

  ngOnInit() {
    if (localStorage.getItem('pedido')) {
      this.pedido = JSON.parse(localStorage.getItem('pedido'));
      this.statusAtual = this.pedido.pedido.status_id;
      this.verificaFlag() ;
      localStorage.removeItem('pedido');
    }
  }

  public verificaFlag() {
    if (this.statusAtual == 1) {
      this.pedido_pag_pendente.setValue(true);
    }
    if (this.statusAtual == 2) {
      this.pedido_pag_confirmado.setValue(true);
    }
    if (this.statusAtual == 3) {
      this.pedido_separacao.setValue(true);
    }
    if (this.statusAtual == 4) {
      this.pedido_preparado_envio.setValue(true);
    }
    if (this.statusAtual == 5) {
      this.pedido_pedido_retirar.setValue(true);
    }
    if (this.statusAtual == 6) {
      this.pedido_concluido.setValue(true);
    }
    if (this.statusAtual == 7) {
      this.pedido_cancelado.setValue(true);
    }

  }

  public onSubmit(values: Object): void {

  }

  public atualizarStatusPedido(status): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    this.pedidoService.atualizarStatusPedido(this.pedido.pedido.pedido_id, status).subscribe(
      marca => {
        resp = marca['response'];
        if (resp.status == 'true') {

          msgSucesso = {
            item: 'Parabéns!',
            descricao: 'Status Atualizado com sucesso!'
          };

          this.statusAtual = status;

        }
        else {
          msgErro.item = 'Erro ao atualizar status do pedido!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao atualizar status do pedido!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );

  }

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  public voltar() {
    this.router.navigate(['/adm/produtos-adm']);
  }

}

