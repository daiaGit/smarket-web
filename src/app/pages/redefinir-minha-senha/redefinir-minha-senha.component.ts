import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { TranslateService } from 'ng2-translate/ng2-translate';

/** SERVICES */
import { AcessoService } from './../../services/acesso.service';

@Component({
  selector: 'app-redefinir-minha-senha',
  templateUrl: './redefinir-minha-senha.component.html',
  styleUrls: ['./redefinir-minha-senha.component.scss'],
  providers: [
    AcessoService
  ],
  encapsulation: ViewEncapsulation.None
})

export class RedefinirMinhaSenhaComponent implements OnInit {
  public erros: Array<any> = [];
  public router: Router;
  public form: FormGroup;
  public formSubmit: any = {
    status: false,
    descricao: ''
  };

  public email: AbstractControl;
  public password: AbstractControl;
  public passwordType: any = '';;

  constructor(router: Router, fb: FormBuilder,
    private fs: FacebookService,
    private acessoService: AcessoService) {
    this.router = router;

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    fs.init({
      appId: '460634367628229',
      version: 'v2.9'
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.passwordType = 'password';

  }

  ngOnInit(): void {

  }

  public handleError(error) {
    console.error('Error processing action', error);
  }

  public onSubmit(values: Object): void {
    var resp: any;
    var msgErro: any = {
      item: '',
      descricao: ''
    };

    if (this.form.valid) {
      this.acessoService.autenticarUsuarioSmarket(values).subscribe(
        login => {
          resp = login['response'];

          if (resp.status == 'true') {
            if (resp.objeto.tipo_usuario_id == 1) {
              if (resp.objeto.status_id != 3 && resp.objeto.status_id != 4 && resp.objeto.status_id != 6) {
                this.acessoService.liberaAcessoSmarket(resp.objeto);
                if (this.acessoService.usuarioSmarketEstaAutenticado()) {
                  this.router.navigate(['/smarket/dashboard-smarket']);
                }
              }
              else {
                msgErro.item = 'Erro ao efetuar o login!';
                msgErro.descricao = 'Sua conta esta' + resp.objeto.status_descricao + '';
                this.erros.push(msgErro);
              }
            }
            else {
              msgErro.item = 'Erro ao efetuar o login!';
              msgErro.descricao = 'Seu usuário nâo possui permissão para acessar o portal smarket!';
              this.erros.push(msgErro);
            }
          }
          else {
            msgErro.item = 'Erro ao efetuar o login!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao efetuar login!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }

  public closeAlert(index) {
    this.erros.splice(this.erros.indexOf(index), 1);
  }

  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

  setTypePassword(type) {
    this.passwordType = type;
  }
}

export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}