import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ConsumidorService } from 'app/services/consumidor.service';
import { DomSanitizer } from '@angular/platform-browser';

/** Services */
import { SubcategoriaService } from './../../../services/subcategoria.service';
import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'app-categoria-smarket-create',
  templateUrl: './categoria-smarket-create.component.html',
  styleUrls: ['./categoria-smarket-create.component.scss'],
  providers: [
    CategoriaService,
    SubcategoriaService,
  ],
  encapsulation: ViewEncapsulation.None
})

export class CategoriaSmarketCreateComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public erros: Array<any> = [];
  public sucessos: Array<any> = [];

  public image: any;
  public imageUsuario: any;

  public categoria_id: any;
  public subcategorias: Array<any> = [];

  public categoria_descricao: AbstractControl;
  public subcategoria_descricao: AbstractControl;

  constructor(router: Router,
    fb: FormBuilder,
    public categoriaService: CategoriaService,
    public subcategoriaService: SubcategoriaService,
    private domSanitizer: DomSanitizer
  ) {

    this.router = router;

    this.form = fb.group({
      categoria_descricao: ['', Validators.compose([Validators.required])],
      subcategoria_descricao: ['', Validators.compose([Validators.required])],
    });

    this.categoria_descricao = this.form.controls['categoria_descricao'];
    this.subcategoria_descricao = this.form.controls['subcategoria_descricao'];
  }

  ngOnInit() {

  }

  public onSubmit(values: any): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (this.form.valid && (this.image != '' || this.image != null || this.image)) {

      this.categoriaService.setCategoria(values, this.image).subscribe(
        categoria => {

          resp = categoria['response'];
          if (resp.status == 'true') {
            var msgSucesso: any = {
              item: 'Parabéns!',
              descricao: 'Categoria Cadastrada com sucesso.'
            };
            this.sucessos.push(msgSucesso);
            console.log(resp);            
            this.categoria_id = resp.objeto[0].categoria_id;
            for(let subcategoria in this.subcategorias){
              this.adicionarSubcategoria(subcategoria);
            }
          }
          else {
            msgErro.item = 'Erro ao efetuar o cadastro de categoria!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar o cadastro de categoria!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.categoria_descricao.markAsTouched();
      this.subcategoria_descricao.markAsTouched();
      if(this.image == '' || this.image == null || !this.image){

      }
    }
  }

  public adicionarSubcategoria(subcategoria: any): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (subcategoria) {
      this.subcategoriaService.setSubCategoria(subcategoria, this.categoria_id).subscribe(
        categoria => {
          resp = categoria['response'];
          if (resp.status == 'true') {
            var msgSucesso: any = {
              item: 'Parabéns!',
              descricao: 'Subcategoria cadastrada com sucesso.'
            };
            this.sucessos.push(msgSucesso);
          }
          else {
            msgErro.item = 'Erro ao efetuar o cadastro de subcategoria!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar o cadastro de subcategoria!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.categoria_descricao.markAsTouched();
    }
  }

  public incluirSubcategoria() {
    if(this.subcategoria_descricao.value != ''){
      this.subcategorias.push(this.subcategoria_descricao.value);
    }
  }

  public removerSubcategoria(index) {
    this.subcategorias.splice(this.subcategorias.indexOf(index), 1);
  }
  

  public closeAlert(index) {
    this.erros.splice(this.erros.indexOf(index), 1);
  }

  public closeAlertSucesso(index) {
    this.sucessos.splice(this.erros.indexOf(index), 1);
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

  alterarImagem(){
    this.imageUsuario = this.image;
  }

  removeImage(): void {
    this.image = '';
  }

}
