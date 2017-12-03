
/** Angular */
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

/** Services */

import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../theme/components/menu/menu.service';
import { PedidoService } from './../../services/pedido.service';

@Component({
  selector: 'app-pedidos-adm',
  templateUrl: './pedidos-adm.component.html',
  styleUrls: ['./pedidos-adm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MenuService,
    PedidoService
  ]
})

export class PedidosAdmComponent implements OnInit {
  public erros: Array<any> = [];
  public pedidos: any[];
  public p: any;
  public file: any;

  public menuItems: Array<any>;

  public searchText: string;

  constructor(public fb: FormBuilder,
    public router: Router,
    public toastrService: ToastrService,
    public pedidoService: PedidoService,
    public menuService: MenuService,
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

    this.getPedidos();

  }

  public getPedidos(): void {
    var resp: any;

    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.pedidoService.getPedidosPorEstabelecimento().subscribe(
      pedidos => {
        resp = pedidos['response'];
        if (resp['status'] == 'true') {
          this.pedidos = resp.objeto;
          console.log(this.pedidos);
        }
        else {
          msgErro.item = 'Erro ao buscar pedidos!';
          msgErro.descricao = resp.descricao;
          this.erros.push(msgErro);
        }
      },
      err => {
        msgErro.item = 'Erro ao buscar pedidos!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
  }

  public acompanharPedido(pedido) {
    localStorage.setItem('pedido', JSON.stringify(pedido));
    this.router.navigate(['adm/pedidos-adm/pedidos-status']);
  }

  public detalharPedido(pedido) {
    localStorage.setItem('pedido', JSON.stringify(pedido));
    this.router.navigate(['adm/pedidos-adm/pedidos-details']);
  }

}





