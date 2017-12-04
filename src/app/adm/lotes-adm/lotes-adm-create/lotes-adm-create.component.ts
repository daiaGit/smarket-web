import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/** Services */
import { ProdutoService } from './../../../services/produto.service';
import { CategoriaService } from './../../../services/categoria.service';
import { SubcategoriaService } from './../../../services/subcategoria.service';
import { MarcaService } from './../../../services/marca.service';
import { CompleterData, CompleterService } from 'ng2-completer';

@Component({
  selector: 'app-lotes-adm-create',
  templateUrl: './lotes-adm-create.component.html',
  styleUrls: ['./lotes-adm-create.component.scss'],
  providers: [
    ProdutoService
  ],
  encapsulation: ViewEncapsulation.None
})

export class LotesAdmCreateComponent implements OnInit {
  @ViewChild('openModal') openModal:ElementRef;

  public router: Router;
  public form: FormGroup;
  public sucessos: Array<any> = [];
  public erros: Array<any> = [];
  public exibirModal: boolean = false;
  public modelPopup: NgbDateStruct = { 
    day: new Date().getDate(), 
    month: new Date().getMonth(), 
    year: new Date().getFullYear() 
  };

  model: NgbDateStruct;
  date: {day: number ,month: number, year: number};

  public produtos: Array<any> = [];
  public produto: any;
  public unidadesMedida: Array<any> = [];

  public produto_id: AbstractControl;
  public produto_descricao: AbstractControl;
  public lote_data_fabricacao: AbstractControl;
  public lote_data_vencimento: AbstractControl;
  public lote_preco: AbstractControl;
  public lote_obs: AbstractControl;
  public lote_quantidade: AbstractControl;
  public unidade_medida_id: AbstractControl;
  public qtd_minima_pj: AbstractControl;
  public qtd_minima_pf: AbstractControl;
  public vender_para_pf: AbstractControl;
  public vender_para_pj: AbstractControl;

  protected searchStr: string;
  protected captain: string;
  public dataService: CompleterData;

  constructor(router: Router,
    fb: FormBuilder,
    public produtoService: ProdutoService,
    private completerService: CompleterService
  ) {

    this.router = router;

    this.form = fb.group({
      produto_id: ['', Validators.compose([Validators.required])],
      produto_descricao: [''],
      lote_data_fabricacao: ['', Validators.compose([Validators.required])],
      lote_data_vencimento: ['', Validators.compose([Validators.required])],
      lote_preco: ['', Validators.compose([Validators.required])],
      lote_obs: [''],
      lote_quantidade: ['', Validators.compose([Validators.required])],
      unidade_medida_id: ['', Validators.compose([Validators.required])],
      qtd_minima_pj: [''],
      qtd_minima_pf: [''],
      vender_para_pf: [''],
      vender_para_pj: [''],
    });

    this.produto_id = this.form.controls['produto_id'];
    this.produto_descricao = this.form.controls['produto_descricao'];
    this.lote_data_fabricacao = this.form.controls['lote_data_fabricacao'];
    this.lote_data_vencimento = this.form.controls['lote_data_vencimento'];
    this.lote_preco = this.form.controls['lote_preco'];
    this.lote_obs = this.form.controls['lote_obs'];
    this.lote_quantidade = this.form.controls['lote_quantidade'];
    this.unidade_medida_id = this.form.controls['unidade_medida_id'];
    this.qtd_minima_pj = this.form.controls['qtd_minima_pj'];
    this.qtd_minima_pf = this.form.controls['qtd_minima_pf'];
    this.vender_para_pf = this.form.controls['vender_para_pf'];
    this.vender_para_pj = this.form.controls['vender_para_pj'];

  }

  ngOnInit() {
    this.produto = JSON.parse(localStorage.getItem('produto'));

    if (this.produto && this.produto != null) {
      localStorage.removeItem('produto');

      var descricaoProduto =  this.produto.produto_descricao + ' - ' + this.produto.marca_descricao + ' - ' + this.produto.quantidade + ' ' + this.produto.unidade_medida_sigla;
      this.form.controls['produto_id'].setValue(this.produto.produto_id);
      this.form.controls['produto_descricao'].setValue(descricaoProduto);
      this.vender_para_pj.setValue(true);
      this.vender_para_pf.setValue(true);
      this.qtd_minima_pf.setValue('1');
      this.qtd_minima_pj.setValue('1');
      this.listarUnidadesMedida();
      this.listarProdutos();

    }
    else {
      this.voltar();
    }
  }

  public onSubmit(values: Object): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (this.form.valid) {

      this.produtoService.setLote(values).subscribe(
        lote => {
          resp = lote['response'];
          if (resp.status == 'true') {
            this.openModal.nativeElement.click();
          }
          else {
            msgErro.item = 'Erro ao efetuar o cadastro de lotes!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar o cadastro de lotes!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.produto_id.markAsTouched();
      this.lote_data_fabricacao.markAsTouched();
      this.lote_data_vencimento.markAsTouched();
      this.lote_preco.markAsTouched();
      this.lote_obs.markAsTouched();
      this.lote_quantidade.markAsTouched();
      this.unidade_medida_id.markAsTouched();
      this.qtd_minima_pj.markAsTouched();
      this.qtd_minima_pf.markAsTouched();
      this.vender_para_pf.markAsTouched();
      this.vender_para_pj.markAsTouched();
    }
  }

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  buscarIdProduto() {
    for (let i in this.produtos) {
      if (this.produtos[i].produto_descricao == this.produto_id.value) {
        return this.produtos[i].produto_id;
      }
    }
  }

  public voltar() {
    this.router.navigate(['/adm/produtos-adm']);
  }

  public redirecionarProdutos() {
    this.router.navigate(['/adm/produtos-adm']);
  }

  public redirecionarLotes() {
    this.router.navigate(['/adm/lotes-adm']);
  }


  public closeAlertSucesso(index) {
    this.sucessos.splice(index, 1);
  }

  /** LISTAR CONTEÚDO */
  listarUnidadesMedida() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };


    this.produtoService.getUnidadesMedidas().subscribe(
      unidadesMedida => {

        resp = unidadesMedida['response'];
        if (resp.status == 'true') {
          this.unidadesMedida = resp.objeto;
        }
        else {

          msgErro.item = 'Erro ao carregar as unidades de medida!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {

        msgErro.item = 'Erro ao carregar as unidades de medida!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  listarProdutos() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };


    this.produtoService.getProdutosByEstabelecimento().subscribe(
      unidadesMedida => {

        resp = unidadesMedida['response'];
        if (resp.status == 'true') {
          this.produtos = resp.objeto;
          this.dataService = this.completerService.local(this.produtos, 'produto_descricao', 'produto_descricao');
        }
        else {

          msgErro.item = 'Erro ao carregar os produtos!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar os produtos!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

}

