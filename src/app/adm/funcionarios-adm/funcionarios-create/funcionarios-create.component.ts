import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

/** Services */
import { FuncionarioService } from './../../../services/funcionario.service';
import { CargoService } from './../../../services/cargo.service';
import { TipoTelefoneService } from './../../../services/tipos-telefone.service';

@Component({
  selector: 'app-funcionarios-create',
  templateUrl: './funcionarios-create.component.html',
  styleUrls: ['./funcionarios-create.component.scss'],
  providers: [
    TipoTelefoneService,
    CargoService,
    FuncionarioService
  ],
  encapsulation: ViewEncapsulation.None
})
export class FuncionariosCreateComponent implements OnInit {
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
    public funcionarioService: FuncionarioService,
    public cargoService: CargoService,

  ) {

    this.router = router;

    this.form = fb.group({
      cargo_id: ['', Validators.compose([Validators.required])],
      email_descricao: ['', Validators.compose([Validators.required, emailValidator])],
      funcionario_cpf: ['', Validators.compose([Validators.required, cpfValidator])],
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
    this.listarTiposTelefone();
    this.listarCargos();
  }

  public onSubmit(values: Object): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (this.form.valid) {
      this.funcionarioService.setFuncionarios(values).subscribe(
        funcionario => {
          resp = funcionario['response'];
          if (resp.status == 'true') {
            localStorage.setItem('msgSucessoCreateFuncionario', 'Funcionário Cadastrado com Sucesso.');
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
      this.funcionario_cpf.markAsTouched();
      this.funcionario_nome.markAsTouched();
      this.funcionario_sobrenome.markAsTouched();
      this.telefone_ddd.markAsTouched();
      this.telefone_numero.markAsTouched();
      this.tipo_telefone_id.markAsTouched();
    }
  }

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  public voltar() {
    this.router.navigate(['/adm/funcionarios-adm']);
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

export function cpfValidator(control: FormControl): { [key: string]: any } {
  var cpf = control.value;
  var resp = true
  var add = 0;

  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    resp = false;
  }


  for (var i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(9))) {
    resp = false;
  }

  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(10))) {
    resp = false;
  }

  if (!resp) {
    return { invalidCpf: true };
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