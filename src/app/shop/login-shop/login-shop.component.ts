import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';

/** SERVICES */
import { AcessoService } from './../../services/acesso.service';

@Component({
  selector: 'app-login-shop',
  templateUrl: './login-shop.component.html',
  styleUrls: ['./login-shop.component.scss'],
  providers: [
    AcessoService
],
  encapsulation: ViewEncapsulation.None
})

export class LoginShopComponent implements OnInit {
  public erros: Array<any> = [];
  public router: Router;
  public form: FormGroup;

  public email: AbstractControl;
  public password: AbstractControl;

  public perfil:any;
  public gif:any;
  public iconePerfilPj:any;
  public iconePerfilPf:any;

  constructor(  router:Router, fb:FormBuilder, 
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
     
  }

  ngOnInit(): void {
    this.perfil = 'consumidor';
    this.gif = '../../../assets/img/gif/gif-login-consumidor.gif';
    this.iconePerfilPj = '../../../assets/img/icone/icone-pj-gray.png';
    this.iconePerfilPf = '../../../assets/img/icone/icone-pf-yellow.png';
  }

  public handleError(error) {
    console.error('Error processing action', error);
  }

  public onSubmit(values: Object): void {
    var resp: any;
    var msgErro: any = {
        item : '',
        descricao: ''
    };

    if (this.form.valid) {
      this.acessoService.autenticar(values).subscribe(
        login => {
          resp = login['response'];

          if (resp.status == 'true') {
            if(resp.objeto.tipo_usuario_id == 2 || resp.objeto.tipo_usuario_id == 3){
              if(resp.objeto.status_id != 3 && resp.objeto.status_id != 4 && resp.objeto.status_id != 6){
                this.acessoService.liberaAcessoShop(resp.objeto);
                if(this.acessoService.usuarioShopEstaAutenticado()){
                  this.router.navigate(['/adm/dashboard-adm']);
                }                
              }
              else {
                msgErro.item = 'Erro ao efetuar o login!';
                msgErro.descricao = 'Sua conta esta' + resp.objeto.status_descricao + '!';
                this.erros.push(msgErro);
              }     
            }
            else {
              msgErro.item = 'Erro ao efetuar o login!';
              msgErro.descricao = 'Seu usuário nâo possui permissão para acessar nossa loja!';
              this.erros.push(msgErro);
            }       
          }
          else {
            msgErro.item = 'Erro ao efetuar o login!';
            msgErro.descricao =  resp.descricao;
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

  /** Login com Email */
  public loginEmail(consumidor: any) {           
    
  }

  /** Login com Facebook */
  public getLoginFacebook() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };

    this.fs.login(loginOptions)
      .then((res: LoginResponse) => {
          if(res.status == "connected"){
            this.getProfileFacebook();
          }
      })
      .catch(this.handleError);
  }

  public getLoginFacebookStatus() {
    this.fs.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }

  public getProfileFacebook() {
    var params: any;
    this.fs.api('/me?fields=id,name,first_name,last_name,gender,email')
      .then((res: any) => {
        console.log('Resgatando dados do Facebook:', res);
        this.loginFacebook(res);  
      })
  }

  public loginFacebook(consumidor: any) { 
    var resp: any;
    var msgErro: any = {
        item : '',
        descricao: ''
    };

    this.acessoService.autenticarFacebook(consumidor).subscribe(
      login => {
        resp = login['response'];

        if (resp.status == 'true') {
            if(resp.objeto.status_id != 3 && resp.objeto.status_id != 4 && resp.objeto.status_id != 6){
              this.acessoService.liberaAcessoShop(resp.objeto);
              if(this.acessoService.usuarioAdmEstaAutenticado()){
                this.router.navigate(['/adm/dashboard-adm']);
              }                
            }
            else {
              msgErro.item = 'Erro ao efetuar o login!';
              msgErro.descricao = 'Sua conta esta' + resp.objeto.status_descricao + '!';
              this.erros.push(msgErro);
            }   
        }
        else {
          msgErro.item = 'Erro ao efetuar o login!';
          msgErro.descricao =  resp.descricao;
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

  public closeAlert(index) {
    this.erros.splice(index, 1);
  }

  public alterarPerfil(perfil){
    this.perfil = perfil;
    if(perfil == 'consumidor'){
      this.gif = "../../../assets/img/gif/gif-login-consumidor.gif";
      this.iconePerfilPj = '../../../assets/img/icone/icone-pj-gray.png';
      this.iconePerfilPf = '../../../assets/img/icone/icone-pf-yellow.png';
    }
    else{
      this.gif = "../../../assets/img/gif/gif-login-estabelecimento.gif";
      this.iconePerfilPj = '../../../assets/img/icone/icone-pj-yellow.png';
      this.iconePerfilPf = '../../../assets/img/icone/icone-pf-gray.png';
    }

  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }

}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
