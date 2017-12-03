import { EstabelecimentoService } from 'app/services/estabelecimento.service';
import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-aprovacao',
    templateUrl: './aprovacao.component.html',
    styleUrls: ['./aprovacao.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        EstabelecimentoService
    ]
})
export class AprovacaoComponent {
    public erros: Array<any> = [];
    public estabelecimentos: any = [];
    public estabelecimento: any;
    public sucessos: Array<any> = [];

    public searchText: string;

    public aprovacao: any = {
        usuario_id: "",
        tipo_usuario_id: "",
        estabelecimento_id: "",
        aprovacao_status: null,
        aprovacao_observacao: ""
    };

    constructor(
        public router: Router,
        public estabelecimentoService: EstabelecimentoService) {

    }

    ngOnInit() {
        this.listarEstabelecimentosParaAprovacao();
    }

    public viewDetail(estabelecimento) {
        this.aprovacao = {
            usuario_id: "",
            tipo_usuario_id: "",
            estabelecimento_id: "",
            aprovacao_status: null,
            aprovacao_observacao: ""
        };
        this.estabelecimento = estabelecimento.conjunto;
    }

    public setAprovacao(value) {
        this.aprovacao.aprovacao_status = value;
    }

    public aprovarCadastro(estabelecimento) {

        if (this.aprovacao.aprovacao_status != null) {
            if (this.aprovacao.aprovacao_status == 1 || (this.aprovacao.aprovacao_status == 0 && this.aprovacao.aprovacao_observacao != '')) {
                this.aprovacao.usuario_id = estabelecimento.usuario.usuario_id;
                this.aprovacao.tipo_usuario_id = 4;
                this.aprovacao.estabelecimento_id = estabelecimento.estabelecimento.estabelecimento_id;
                this.enviarAprovacao();
            }
        }

    }

    public closeAlert(index) {
        this.erros.splice(index, 1);
    }

    public closeAlertSucesso(index) {
        this.sucessos.splice(index, 1);
    }

    /** Listar Conteúdo */
    public listarEstabelecimentosParaAprovacao() {
        var resp: any;
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        this.estabelecimentoService.getEstabelecimentosPedentes().subscribe(
            estabelecimento => {
                resp = estabelecimento['response'];
                if (resp.status == 'true') {
                    this.estabelecimentos = resp.objeto;
                }
                else {
                    msgErro.item = 'Lista Estabelecimentos Pendentes';
                    msgErro.descricao = resp.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {
                msgErro.item = 'Lista Estabelecimentos Pendentes';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }

    /** Listar Conteúdo */
    public enviarAprovacao() {
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        var msgSucesso: any = {
            item: '',
            descricao: ''
        };

        var resp: any;

        this.estabelecimentoService.setAprovacaoCadastroVendedor(this.aprovacao).subscribe(
            aprovacao => {
                resp = aprovacao['response'];
                if (resp.status == 'true') {
                    this.estabelecimentos = [];
                    msgSucesso.item = 'Aprovar Estabelecimentos Pendentes';
                    msgSucesso.descricao = resp.descricao;
                    this.sucessos.push(msgSucesso);
                    this.listarEstabelecimentosParaAprovacao();
                }
                else {
                    msgErro.item = 'Aprovar Estabelecimentos Pendentes';
                    msgErro.descricao = resp.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {
                msgErro.item = 'Aprovar Estabelecimentos Pendentes';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }

}





