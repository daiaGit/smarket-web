/** Angular */
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

/** Services */

import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../theme/components/menu/menu.service';
import { ProdutoService } from './../../services/produto.service';

@Component({
  selector: 'app-produtos-adm',
  templateUrl: './produtos-adm.component.html',
  styleUrls: ['./produtos-adm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MenuService,
    ProdutoService
  ]
})

export class ProdutosAdmComponent implements OnInit {
  public erros: Array<any> = [];
  public sucessos: Array<any> = [];
  public produtos: any[];
  public p: any;
  public file: any;

  public menuItems: Array<any>;

  public searchText: string;

  constructor(public fb: FormBuilder,
    public router: Router,
    public toastrService: ToastrService,
    public produtosService: ProdutoService,
    public menuService: MenuService,
    public domSanitizer: DomSanitizer,
    public modalService: NgbModal) {

    this.menuItems = this.menuService.getVerticalMenuItems();
    this.menuItems.forEach(item => {
      let menu = {
        id: item.id,
        name: item.title
      }
    })

  }

  ngOnInit() {

    this.getProdutos();

    if (localStorage.getItem('msgSucessoProdutoCreate')) {
      var msgSucesso: any = {
        item: 'Parabéns!',
        descricao: localStorage.getItem('msgSucessoProdutoCreate')
      };
      this.sucessos.push(msgSucesso);
      localStorage.removeItem('msgSucessoProdutoCreate')
    }

  }

  public getProdutos(): void {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.produtosService.getProdutosEstabelecimento().subscribe(
      produtos => {
        resp = produtos['response'];
        if (resp['status'] == 'true') {
          this.produtos = resp.objeto;
          console.log(this.produtos);
          for (let i in this.produtos) {
            if (this.produtos[i].produto_img_b64) {
              this.produtos[i].produto_img_b64 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.produtos[i].produto_img_b64);
            }
          }
        }
        else {
          msgErro.item = 'Erro ao buscar produtos!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao buscar produtos!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public editarProduto(produto) {
    localStorage.setItem('produto', JSON.stringify(produto));
    this.router.navigate(['adm/produtos-adm/produtos-edit']);
  }

  public adicionarLote(produto) {
    localStorage.setItem('produto', JSON.stringify(produto));
    this.router.navigate(['adm/lotes-adm/lotes-adm-create']);
  }

  public listarLotes() {
    this.router.navigate(['adm/lotes-adm']);
  }

  public cadastrarProdutos() {
    this.router.navigate(['adm/produtos-adm/produtos-create']);
  }

  public importarPlanilhaProdutos() {

  }

  fileChange(input) {
    const reader = new FileReader();
    if (input.files.length) {
      const file = input.files[0];
      reader.onload = () => {
        this.file = reader.result;
      }
      reader.readAsDataURL(file);

    }
  }

  enviarArquivo() {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.produtosService.doUploadProduto(this.file).subscribe(
      produtosUpload => {
        resp = produtosUpload['response'];
        if (resp['status'] == 'true') {
          console.log(resp);
        }
        else {
          msgErro.item = 'Erro ao importar Planilha Produtos!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao importar Planilha Produtos!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public desativarProduto(produto): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    this.produtosService.desativarProduto(produto.produto_id).subscribe(
      desativar => {
        resp = desativar['response'];
        if (resp.status == 'true') {
          msgSucesso = {
            item: 'Parabéns!',
            descricao: produto.produto_descricao + ' ' + produto.marca_descricao +
              ' desativado com sucesso! Caso possua algum lote ativo do produto ele não será mais exibido.'
          }
          this.sucessos.push(msgSucesso);
          this.getProdutos();
        }
        else {
          msgErro.item = 'Erro ao desativar ' + produto.produto_descricao + ' - ' + produto.marca_descricao + '!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao desativar ' + produto.produto_descricao + ' - ' + produto.marca_descricao + '!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public ativarProduto(produto): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    this.produtosService.ativarProduto(produto.produto_id).subscribe(
      desativar => {
        resp = desativar['response'];
        if (resp.status == 'true') {
          msgSucesso = {
            item: 'Parabéns!',
            descricao: produto.produto_descricao + ' ' + produto.marca_descricao + ' ativado com sucesso!'
          }
          this.sucessos.push(msgSucesso);
          this.getProdutos();
        }
        else {
          msgErro.item = 'Erro ao ativar ' + produto.produto_descricao + ' - ' + produto.marca_descricao + '!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao ativar ' + produto.produto_descricao + ' - ' + produto.marca_descricao + '!';
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

  removeFile(): void {
    this.file = '';
  }

}





