/** Angular */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OnInit } from '@angular/core';

/** Services */
import { TiposEstabelecimentoService } from './../../../services/tipos-estabelecimento.service';
import { EstabelecimentoService } from 'app/services/estabelecimento.service';

@Component({
    selector: 'app-estabelecimento-adm-comercial',
    templateUrl: './estabelecimento-adm-comercial.component.html',
    styleUrls: ['./estabelecimento-adm-comercial.component.scss'],
    providers: [
        EstabelecimentoService
    ],
    encapsulation: ViewEncapsulation.None
})

export class EstabelecimentoAdmComercialComponent implements OnInit {
    [x: string]: any;
    public router: Router;
    public form: FormGroup;
    public erros: Array<any> = [];

    public estabelecimento: any = {
        estabelecimento_razao_social: '',
        estabelecimento_nome_fantasia: '',
        estabelecimento_cnpj: '',
        estabelecimento_tipo_estabelecimento_descricao: '',
        estabelecimento_inscricao_estadual: '',
        estabelecimento_inscricao_municipal: ''
    };


    constructor(    router: Router,
                    public estabelecimentoService: EstabelecimentoService
    ) {
        this.router = router;
    }

    public ngOnInit() {
        this.listarEstabelecimentoVendedor();
    }

    public ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    /** Ações ao enviar Formulário */
    public onSubmit(values: Object): void {

    }

    /** Ações Formulário */
    public closeAlert(index) {
        this.erros.splice(this.erros.indexOf(index), 1);
    }

    /** LISTAR CONTEÚDO */
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
             
                    this.estabelecimento.estabelecimento_razao_social = resp.objeto[0].estabelecimento_razao_social;
                    this.estabelecimento.estabelecimento_nome_fantasia = resp.objeto[0].estabelecimento_nome_fantasia;
                    this.estabelecimento.estabelecimento_cnpj = resp.objeto[0].estabelecimento_cnpj;
                    this.estabelecimento.estabelecimento_tipo_estabelecimento_descricao = resp.objeto[0].estabelecimento_razao_social;
                    this.estabelecimento.estabelecimento_inscricao_estadual = resp.objeto[0].estabelecimento_inscricao_estadual;
                    this.estabelecimento.estabelecimento_inscricao_municipal = resp.objeto[0].estabelecimento_inscricao_municipal;
                    console.log(this.estabelecimento);

                }
                else {
                    msgErro.item = 'Erro ao carregar dados do estabelecimento!';
                    msgErro.descricao = resp.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {
                msgErro.item = 'Erro ao carregar dados do estabelecimento!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }  

}
