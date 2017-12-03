
/** Angular */
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

/** Services */
import { FuncionarioService } from './../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../theme/components/menu/menu.service';

@Component({
  selector: 'app-funcionarios-adm',
  templateUrl: './funcionarios-adm.component.html',
  styleUrls: ['./funcionarios-adm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MenuService,
    FuncionarioService
  ]
})

export class FuncionariosAdmComponent implements OnInit {
  public erros: Array<any> = [];
  public sucessos: Array<any> = [];
  public funcionarios: any[];
  public p: any;

  public menuItems: Array<any>;

  public searchText: string;

  constructor(public fb: FormBuilder,
    public router: Router,
    public toastrService: ToastrService,
    public funcionarioService: FuncionarioService,
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

    this.getFuncionarios();

    if (localStorage.getItem('msgSucessoCreateFuncionario')) {
      var msgSucesso: any = {
        item: 'Parabéns!',
        descricao: localStorage.getItem('msgSucessoCreateFuncionario')
      };
      this.sucessos.push(msgSucesso);
      localStorage.removeItem('msgSucessoCreateFuncionario')
    }

    if (localStorage.getItem('msgSucessoEditFuncionario')) {
      var msgSucesso: any = {
        item: 'Parabéns!',
        descricao: localStorage.getItem('msgSucessoEditFuncionario')
      };
      this.sucessos.push(msgSucesso);
      localStorage.removeItem('msgSucessoEditFuncionario')
    }

  }

  public getFuncionarios(): void {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.funcionarioService.getFuncionarioPorEstabeleciemento().subscribe(
      funcionarios => {
        resp = funcionarios['response'];
        if (resp['status'] == 'true') {
          this.funcionarios = resp['objeto'];
          for(let i in this.funcionarios){
            if(this.funcionarios[i].funcionario_img_b64){
              this.funcionarios[i].funcionario_img_b64= this.domSanitizer.bypassSecurityTrustResourceUrl(this.funcionarios[i].funcionario_img_b64);
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

  public editarFuncionario(funcionario) {
    localStorage.setItem('funcionario', JSON.stringify(funcionario));
    this.router.navigate(['adm/funcionarios-adm/funcionarios-edit']);
  }

  public cadastrarFuncionario() {
    this.router.navigate(['adm/funcionarios-adm/funcionarios-create']);
  }

  public closeAlert(index) {
    this.erros.splice(this.erros.indexOf(index), 1);
  }

  public closeAlertSucesso(index) {
    this.sucessos.splice(this.erros.indexOf(index), 1);
  }

}





