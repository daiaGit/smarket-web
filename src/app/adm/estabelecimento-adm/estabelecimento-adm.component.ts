import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/** Services */


@Component({
  selector: 'app-estabelecimento-adm',
  templateUrl: './estabelecimento-adm.component.html',
  styleUrls: ['./estabelecimento-adm.component.scss'],
  providers: [

  ],
  encapsulation: ViewEncapsulation.None
})

export class EstabelecimentoAdmComponent implements OnInit {
  public router: Router;
  public form: FormGroup;

  public loja: boolean = true;
  public endereco: boolean = false;
  public telefone: boolean = false;
  public bancario: boolean = false;
  public fotos: boolean = false;
  public contrato: boolean = false;

  constructor(router: Router

  ) {
    this.router = router;



  }

  ngOnInit() {

  }

  public ativarConteudo(tipo) {

    this.loja = false;
    this.endereco = false;
    this.telefone = false;
    this.bancario = false;
    this.fotos = false;
    this.contrato = false;

    if (tipo == 0) {
      this.loja = true;
    }
    else if (tipo == 1) {
      this.endereco = true;
    }
    else if (tipo == 2) {
      this.telefone = true;
    }
    else if (tipo == 3) {
      this.bancario = true;
    }
    else if (tipo == 4) {
      this.fotos = true;
    }
    else if (tipo == 5) {
      this.contrato = true;
    }

  }


}

