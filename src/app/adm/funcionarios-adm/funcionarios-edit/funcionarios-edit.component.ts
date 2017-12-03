import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

/** Services */
import { FuncionarioService } from './../../../services/funcionario.service';
import { CargoService } from './../../../services/cargo.service';
import { TipoTelefoneService } from './../../../services/tipos-telefone.service';

@Component({
  selector: 'app-funcionarios-edit',
  templateUrl: './funcionarios-edit.component.html',
  styleUrls: ['./funcionarios-edit.component.scss'],
  providers: [
    TipoTelefoneService,
    CargoService,
    FuncionarioService
  ],
  encapsulation: ViewEncapsulation.None
})

export class FuncionariosEditComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public erros: Array<any> = [];

  public maskFone: any = {
    mask: '',
    placeholder: ''
  };

  public image: any;

  public tiposTelefone: Array<any> = [];
  public cargos: Array<any> = [];
  public funcionario: any = null;

  public cargo_id: AbstractControl;
  public email_descricao: AbstractControl;
  public funcionario_cpf: AbstractControl;
  public funcionario_nome: AbstractControl;
  public funcionario_sobrenome: AbstractControl;
  public telefone_ddd: AbstractControl;
  public telefone_numero: AbstractControl;
  public tipo_telefone_id: AbstractControl;

  constructor(router: Router,
    fb: FormBuilder,
    public tipoTelefoneService: TipoTelefoneService,
    public cargoService: CargoService,
    public funcionarioService: FuncionarioService
  ) {

    this.router = router;

    this.form = fb.group({
      cargo_id: ['', Validators.compose([Validators.required])],
      email_descricao: ['', Validators.compose([Validators.required, emailValidator])],
      funcionario_cpf: [''],
      funcionario_nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      funcionario_sobrenome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      telefone_ddd: ['', Validators.compose([Validators.required, dddValidator])],
      telefone_numero: ['', Validators.compose([Validators.required, foneValidator])],
      tipo_telefone_id: ['', Validators.required]
    });

    this.cargo_id = this.form.controls['cargo_id'];
    this.email_descricao = this.form.controls['email_descricao'];
    this.funcionario_cpf = this.form.controls['funcionario_cpf'];
    this.funcionario_nome = this.form.controls['funcionario_nome'];
    this.funcionario_sobrenome = this.form.controls['funcionario_sobrenome'];
    this.telefone_ddd = this.form.controls['telefone_ddd'];
    this.telefone_numero = this.form.controls['telefone_numero'];
    this.tipo_telefone_id = this.form.controls['tipo_telefone_id'];

    this.maskFone.mask = '0000-0000';
    this.maskFone.placeholder = 'XXXX-XXXX';
  }

  ngOnInit() {

    this.funcionario = JSON.parse(localStorage.getItem('funcionario'));

    if (this.funcionario && this.funcionario != null) {
      localStorage.removeItem('funcionario');
      this.form.controls['cargo_id'].setValue(this.funcionario.cargo_id);
      this.form.controls['email_descricao'].setValue(this.funcionario.email_descricao);
      this.form.controls['funcionario_cpf'].setValue(this.funcionario.funcionario_cpf);
      this.form.controls['funcionario_nome'].setValue(this.funcionario.funcionario_nome);
      this.form.controls['funcionario_sobrenome'].setValue(this.funcionario.funcionario_sobrenome);
      this.form.controls['telefone_ddd'].setValue(this.funcionario.telefone_ddd);
      this.form.controls['telefone_numero'].setValue(this.funcionario.telefone_numero);
      this.form.controls['tipo_telefone_id'].setValue(this.funcionario.tipo_telefone_id);
    }
    else {
      this.voltar();
    }

    this.listarTiposTelefone();
    this.listarCargos();

  }

  public onSubmit(values: any): void {

    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (this.form.valid) {
      this.funcionario.cargo_id = values.cargo_id;
      this.funcionario.email_descricao = values.email_descricao;
      this.funcionario.funcionario_nome = values.funcionario_nome;
      this.funcionario.funcionario_sobrenome = values.funcionario_sobrenome;
      this.funcionario.telefone_ddd = values.telefone_ddd;
      this.funcionario.telefone_numero = values.telefone_numero;
      this.funcionario.tipo_telefone_id = values.tipo_telefone_id;

      this.funcionarioService.alterarDadosFuncionario(this.funcionario).subscribe(
        funcionario => {
          resp = funcionario['response'];
          if (resp.status == 'true') {
            localStorage.setItem('msgSucessoEditFuncionario', 'Funcionário Editado com Sucesso.');
            this.router.navigate(['/adm/funcionarios-adm']);
          }
          else {
            msgErro.item = 'Erro ao efetuar o cadastro de funcionário!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar o cadastro de funcionário!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.cargo_id.markAsTouched();
      this.email_descricao.markAsTouched();
      this.funcionario_nome.markAsTouched();
      this.funcionario_sobrenome.markAsTouched();
      this.telefone_ddd.markAsTouched();
      this.telefone_numero.markAsTouched();
      this.tipo_telefone_id.markAsTouched();
    }
  }

  setMaskFone() {
    if (this.tipo_telefone_id.value == 2) {
      this.maskFone.mask = '00000-0000';
      this.maskFone.placeholder = 'XXXXX-XXXX';
    }
    else {
      this.maskFone.mask = '0000-0000';
      this.maskFone.placeholder = 'XXXX-XXXX';
    }
  }

  public closeAlert(index) {
    this.erros.splice(this.erros.indexOf(index), 1);
  }

  public voltar() {
    this.router.navigate(['/adm/funcionarios-adm']);
  }

  /** LISTAR CONTEÚDO */
  listarTiposTelefone() {
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.tipoTelefoneService.listarTodos().subscribe(
      tiposTelefone => {
        this.tiposTelefone = tiposTelefone['tiposTelefone'];
      },
      err => {
        msgErro.item = 'Erro ao buscar tipos de telefone!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );

  }

  public listarCargos() {
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    this.cargoService.listarTodos().subscribe(
      cargos => {
        this.cargos = cargos['cargo'];
      },
      err => {
        msgErro.item = 'Erro ao buscar cargos!';
        msgErro.descricao = err;
        this.erros.push(msgErro);
      }
    );
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

export function foneValidator(control: FormControl): { [key: string]: any } {
  var foneRegexp = /[0-9]{8,9}$/;
  if (control.value && !foneRegexp.test(control.value)) {
    return { invalidTelefone: true };
  }
}

export function dddValidator(control: FormControl): { [key: string]: any } {
  var dddRegexp = /[0-9]{2,2}$/;
  if (control.value && !dddRegexp.test(control.value)) {
    return { invalidDDD: true };
  }
}

export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}