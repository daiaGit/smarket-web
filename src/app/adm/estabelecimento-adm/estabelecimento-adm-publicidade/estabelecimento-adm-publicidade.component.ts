
/** Angular */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/** Services */
import { EstabelecimentoService } from 'app/services/estabelecimento.service';


@Component({
    selector: 'app-estabelecimento-adm-publicidade',
    templateUrl: './estabelecimento-adm-publicidade.component.html',
    styleUrls: ['./estabelecimento-adm-publicidade.component.scss'],
    providers: [
        EstabelecimentoService
    ],
    encapsulation: ViewEncapsulation.None
})

export class EstabelecimentoAdmPublicidadeComponent implements OnInit {
    public router: Router;
    public erros: Array<any> = [];
    public sucessos: Array<any> = [];

    public imageBanner: any;
    public imageLogo: any;

    constructor(router: Router,
        public estabelecimentoService: EstabelecimentoService,
    ) {

        this.router = router;
    }

    public ngOnInit() {

    }

    public ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    adicionarFoto() {
        var resp: any;
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        this.estabelecimentoService.setFotosEstabelecimento(this.imageBanner, this.imageLogo).subscribe(
            estabelecimento => {
                resp = estabelecimento['response'];
                if (resp.status == 'true') {
                    var msgSucesso: any = {
                        item: 'Parabéns!',
                        descricao: 'Suas fotos foram adicionadas com sucesso'
                    };
                    this.sucessos.push(msgSucesso);
                }
                else {
                    msgErro.item = 'Erro ao enviar fotos!';
                    msgErro.descricao = resp.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {
                msgErro.item = 'Erro ao enviar fotos!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }

    listarEstabelecimentoVendedor() {
        var resp: any;
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        this.estabelecimentoService.getEstabelecimentoVendedor().subscribe(
            estabelecimento => {
                resp = estabelecimento['response'];
                if (resp.status == 'true') {

                }
                else {
                    msgErro.item = 'Erro ao carregar imagens do estabelecimento!';
                    msgErro.descricao = resp.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {

                msgErro.item = 'Erro ao carregar imagens do estabelecimento!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }

    /** Ações Formulário */
    public closeAlert(index) {
        this.erros.splice(this.erros.indexOf(index), 1);
    }

    /** Ações Formulário */
    public closeAlertSucesso(index) {
        this.erros.splice(this.erros.indexOf(index), 1);
    }

    fileChangeBanner(input) {
        const reader = new FileReader();
        if (input.files.length) {
          const file = input.files[0];
          reader.onload = () => {
            this.imageBanner = reader.result;
          }
          reader.readAsDataURL(file);
        }
      }
    
      removeImageBanner(): void {
        this.imageBanner = '';
      }

      fileChangeLogo(input) {
        const reader = new FileReader();
        if (input.files.length) {
          const file = input.files[0];
          reader.onload = () => {
            this.imageLogo = reader.result;
          }
          reader.readAsDataURL(file);
        }
      }
    
      removeImageLogo(): void {
        this.imageLogo = '';
      }


}
