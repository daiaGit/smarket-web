import { Router } from '@angular/router';
import { AcessoService } from './../../../services/acesso.service';
import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { FuncionarioService } from 'app/services/funcionario.service';

@Component({
  selector: 'app-header-adm',
  templateUrl: './header-adm.component.html',
  styleUrls: ['./header-adm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MenuService,
    AcessoService,
    FuncionarioService
  ],
  animations: [
    trigger('showInfo', [
      state('1', style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})

export class HeaderAdmComponent implements OnInit {
  public showHorizontalMenu: boolean = true;
  public showInfoContent: boolean = false;
  public settings: Settings;
  public menuItems: Array<any>;
  public tipoPagina: any;

  public image: any;
  public usuario: any;

  constructor(  public appSettings: AppSettings, 
                public menuService: MenuService,
                public acessoService: AcessoService,
                public router: Router,
                public funcionarioService: FuncionarioService) {
    this.settings = this.appSettings.settings;
    this.menuItems = this.menuService.getHorizontalMenuEstabelecimentoItems();
  }

  ngOnInit() {
    if (window.innerWidth <= 768)
      this.showHorizontalMenu = false;
  }

  public closeSubMenus() {
    let menu = document.querySelector("#menu0");
    if (menu) {
      for (let i = 0; i < menu.children.length; i++) {
        let child = menu.children[i].children[1];
        if (child) {
          if (child.classList.contains('show')) {
            child.classList.remove('show');
            menu.children[i].children[0].classList.add('collapsed');
          }
        }
      }
    }
  }

  public sair(){
    this.acessoService.logoutAreaAdm();
    this.router.navigate(['/login-adm']);
  }

  buscarFuncionario() {
    var resp: any;
    var msgErro: any = {
        item: '',
        descricao: ''
    };

    this.funcionarioService.getFuncionario().subscribe(
        funcionario => {

            resp = funcionario['response'];
            
          if (resp.status == 'true') {        
              this.usuario = resp.objeto;
              this.image = this.usuario.foto_descricao
            }
            else {
                msgErro.item = 'Erro ao carregar dados do fucionario!';
                console.log(msgErro);
            }
        },
        err => {
            msgErro.item = 'Erro ao carregar o estabelecimento!';
            msgErro.descricao = err;
            console.log(msgErro);
        }
    );
}

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 768) {
      this.showHorizontalMenu = false;
    }
    else {
      this.showHorizontalMenu = true;
    }
  }

}
