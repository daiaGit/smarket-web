import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

/** Services */
import { ProdutoService } from './../../../services/produto.service';
import { CategoriaService } from './../../../services/categoria.service';
import { SubcategoriaService } from './../../../services/subcategoria.service';
import { MarcaService } from './../../../services/marca.service';

@Component({
  selector: 'app-produtos-adm-create',
  templateUrl: './produtos-adm-create.component.html',
  styleUrls: ['./produtos-adm-create.component.scss'],
  providers: [
    CategoriaService,
    SubcategoriaService,
    ProdutoService,
    MarcaService
  ],
  encapsulation: ViewEncapsulation.None
})

export class ProdutosAdmCreateComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public sucessos: Array<any> = [];
  public erros: Array<any> = [];

  public image: any = '';

  public marcas: Array<any> = [];
  public categorias: Array<any> = [];
  public subcategorias: Array<any> = [];
  public unidadesMedida: Array<any> = [];

  public produto_descricao: AbstractControl;
  public marca_id: AbstractControl;
  public marca_descricao: AbstractControl;
  public categoria_id: AbstractControl;
  public quantidade: AbstractControl;
  public unidade_medida_id: AbstractControl;
  public sub_categoria_id: AbstractControl;

  constructor(router: Router,
    fb: FormBuilder,
    public categoriaService: CategoriaService,
    public subcategoriaService: SubcategoriaService,
    public produtoService: ProdutoService,
    public marcaService: MarcaService
  ) {

    this.router = router;

    this.form = fb.group({
      produto_descricao: ['', Validators.compose([Validators.required])],
      marca_descricao: [''],
      marca_id: ['', Validators.compose([Validators.required])],
      categoria_id: ['', Validators.compose([Validators.required])],
      quantidade: ['', Validators.compose([Validators.required])],
      unidade_medida_id: ['', Validators.compose([Validators.required])],
      sub_categoria_id: ['', Validators.compose([Validators.required])],
    });

    this.produto_descricao = this.form.controls['produto_descricao'];
    this.marca_descricao = this.form.controls['marca_descricao'];
    this.marca_id = this.form.controls['marca_id'];
    this.categoria_id = this.form.controls['categoria_id'];
    this.quantidade = this.form.controls['quantidade'];
    this.unidade_medida_id = this.form.controls['unidade_medida_id'];
    this.sub_categoria_id = this.form.controls['sub_categoria_id'];

  }

  ngOnInit() {
    this.listarCategorias();
    this.listarMarcas();
    this.listarUnidadesMedida();
  }

  public onSubmit(values: Object): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (this.image == '') {
      msgErro.item = 'Erro ao efetuar o cadastro do produto!';
      msgErro.descricao = 'Foto do Produto obrigatória!';
      this.erros.push(msgErro);
    }

    if (this.form.valid && this.image != '') {
      this.produtoService.setProduto(values, this.image).subscribe(
        produto => {
          resp = produto['response'];
          if (resp.status == 'true') {
            localStorage.setItem('msgSucessoProdutoCreate', 'Produto Cadastrado com Sucesso.');
            this.router.navigate(['/adm/produtos-adm']);
          }
          else {
            msgErro.item = 'Erro ao efetuar o cadastro de produtos!';
            msgErro.descricao = resp.
            
            descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar o cadastro de produtos!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.produto_descricao.markAsTouched();
      this.marca_id.markAsTouched();
      this.categoria_id.markAsTouched();
      this.quantidade.markAsTouched();
      this.unidade_medida_id.markAsTouched();
      this.sub_categoria_id.markAsTouched();
    }
  }

  public cadastrarMarca(): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    var msgSucesso: any = {
      item: '',
      descricao: ''
    };

    if (this.marca_descricao.value && this.marca_descricao.value != '') {
      console.log(this.marca_descricao.value);
      this.marcaService.setMarca(this.marca_descricao.value).subscribe(
        marca => {
          resp = marca['response'];
          if (resp.status == 'true') {
            this.listarMarcas();
            msgSucesso = {
              item: 'Parabéns!',
              descricao: 'Marca Adicionada com sucesso'
            }
            this.sucessos.push(msgSucesso);
            this.form.controls['marca_id'].setValue(resp.marca_id);
          }
          else {
            msgErro.item = 'Erro ao efetuar o cadastro de marcas!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar o cadastro de marcas!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.marca_descricao.markAsTouched();
    }
  }

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  public closeAlertSucesso(index) {
    this.sucessos.splice(index, 1);
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      //that.cropper.setImage(image); 
    };

    myReader.readAsDataURL(file);
  }


  /** LISTAR CONTEÚDO */
  listarCategorias() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.categoriaService.getCategorias().subscribe(
      categorias => {
        resp = categorias['response'];
        if (resp.status == 'true') {
          this.categorias = resp.objeto;
        }
        else {
          msgErro.item = 'Erro ao carregar as categorias!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar as categorias!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

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

  listarSubcategorias() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.subcategoriaService.getSubcategoriaPorCategoria(this.categoria_id.value).subscribe(
      unidadesMedida => {
        resp = unidadesMedida['response'];
        if (resp.status == 'true') {
          this.subcategorias = resp.objeto;
        }
        else {
          msgErro.item = 'Erro ao carregar as subcategoria!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar as subcategoria!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );


  }

  listarMarcas() {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.marcaService.getMarcas().subscribe(
      marcas => {
        resp = marcas['response'];
        if (resp.status == 'true') {
          this.marcas = resp.objeto;
        }
        else {
          msgErro.item = 'Erro ao carregar as marcas!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao carregar as marcas!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );


  }

  public voltar() {
    this.router.navigate(['/adm/produtos-adm']);
  }

  fileChange(input) {
    const reader = new FileReader();
    if (input.files.length) {
      const file = input.files[0];
      reader.onload = () => {
        this.image = reader.result;
      }
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.image = '';
  }

}

