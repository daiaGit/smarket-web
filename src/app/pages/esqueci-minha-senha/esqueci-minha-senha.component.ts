import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { TranslateService } from 'ng2-translate/ng2-translate';

/** SERVICES */
import { AcessoService } from './../../services/acesso.service';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.scss'],
  providers: [
    AcessoService
  ],
  encapsulation: ViewEncapsulation.None
})

export class EsqueciMinhaSenhaComponent implements OnInit {
  public erros: Array<any> = [];
  public router: Router;
  public form: FormGroup;
  public formSubmit: any = {
    status: false,
    descricao: ''
  };


  public email: AbstractControl;

  constructor(router: Router,
    fb: FormBuilder,
    private acessoService: AcessoService) {
    this.router = router;

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });


    this.email = this.form.controls['email'];

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
      this.acessoService.recuperarSenha(values).subscribe(
        recuperaSenha => {
          resp = recuperaSenha['response'];
          if (resp.status == 'true') {
            this.router.navigate(['/pages/sucesso']);
          }
          else {
            msgErro.item = 'Erro ao recuperar senha!';
            msgErro.descricao = resp.descricao;
            this.erros.push(msgErro);
          }
        },
        err => {
          msgErro.item = 'Erro ao recuperar senha!';
          msgErro.descricao = err;
          this.erros.push(msgErro);
        }
      );
    }
    else {
      this.email.markAsTouched();
    }
  }

  public closeAlert(index) {
    this.erros.splice(this.erros.indexOf(index), 1);
  }

  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}