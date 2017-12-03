import { CategoriaService } from './../../services/categoria.service';
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



@Component({
  selector: 'app-categoria-smarket',
  templateUrl: './categoria-smarket.component.html',
  styleUrls: ['./categoria-smarket.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MenuService,
    CategoriaService
  ]
})

export class CategoriaSmarketComponent implements OnInit {
  public erros: Array<any> = [];
  public sucessos: Array<any> = [];
  public categorias: any[];

  public p: any;
  public file: any;

  public menuItems: Array<any>;

  public searchText: string;

  constructor(public fb: FormBuilder,
    public router: Router,
    public toastrService: ToastrService,
    public categoriaService: CategoriaService,
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

    this.getLotes();

  }

  public getLotes(): void {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.categoriaService.getCategorias().subscribe(
      categorias => {
        resp = categorias['response'];
        if (resp['status'] == 'true') {
          this.categorias = resp.objeto;
          for(let i in this.categorias){
            if(this.categorias[i].categoria_img_b64){
              this.categorias[i].categoria_img_b64= this.domSanitizer.bypassSecurityTrustResourceUrl(this.categorias[i].categoria_img_b64);
            }
          }
        }
        else {
          msgErro.item = 'Erro ao buscar funcionários!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao buscar funcionários!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public cadastrarCategoria() {
    this.router.navigate(['smarket/categoria-smarket/categoria-smarket-create']);
  }

  public cadastrarSubcategoria() {
    this.router.navigate(['smarket/categoria-smarket/categoria-smarket-create']);
  }

}





