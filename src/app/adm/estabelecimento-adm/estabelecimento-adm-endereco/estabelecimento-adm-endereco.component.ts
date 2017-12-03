import { CepService } from './../../../services/cep.service';
import { TermoUsoService } from './../../../services/termo-uso.service';
import { EstadoService } from 'app/services/estado.service';
import { CidadeService } from 'app/services/cidade.service';
import { CargoService } from './../../../services/cargo.service';
import { TiposEstabelecimentoService } from './../../../services/tipos-estabelecimento.service';
import { EstabelecimentoService } from 'app/services/estabelecimento.service';
import { TipoTelefoneService } from './../../../services/tipos-telefone.service';

/** Angular */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OnInit } from '@angular/core';
import { EnderecoService } from 'app/services/endereco.service';

/** Services */


@Component({
    selector: 'app-estabelecimento-adm-endereco',
    templateUrl: './estabelecimento-adm-endereco.component.html',
    styleUrls: ['./estabelecimento-adm-endereco.component.scss'],
    providers: [
        EstabelecimentoService,
        CidadeService,
        EstadoService,
        CepService,
        EnderecoService
    ],
    encapsulation: ViewEncapsulation.None
})

export class EstabelecimentoAdmEnderecoComponent implements OnInit {
    [x: string]: any;
    public router: Router;
    public form: FormGroup;
    public erros: Array<any> = [];
    public sucessos: Array<any> = [];

    public estabelecimento: any;
    public estados: Array<any> = [];
    public cidades: Array<any> = [];
    public endereco: any = '';

    public rua: AbstractControl;
    public numero: AbstractControl;
    public complemento: AbstractControl;
    public bairro: AbstractControl;
    public cep: AbstractControl;
    public estado: AbstractControl;
    public cidade: AbstractControl;

    constructor(router: Router,
        fb: FormBuilder,
        public estabelecimentoService: EstabelecimentoService,
        public cidadeService: CidadeService,
        public estadoService: EstadoService,
        public cepService: CepService,
        public enderecoService: EnderecoService
    ) {

        this.router = router;

        this.form = fb.group({
            rua: ['', Validators.required],
            numero: ['', Validators.required],
            complemento: [''],
            bairro: ['', Validators.required],
            cep: ['', Validators.compose([Validators.required, cepValidator])],
            estado: ['', Validators.required],
            cidade: ['', Validators.required]
        });


        this.rua = this.form.controls['rua'];
        this.numero = this.form.controls['numero'];
        this.complemento = this.form.controls['complemento'];
        this.bairro = this.form.controls['bairro'];
        this.cep = this.form.controls['cep'];
        this.estado = this.form.controls['estado'];
        this.cidade = this.form.controls['cidade'];
    }

    public ngOnInit() {
        this.listarEstados();
        this.listarEstabelecimentoVendedor();
    }

    public ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    public closeAlert(index) {
        this.erros.splice(this.erros.indexOf(index), 1);
    }

    public closeAlertSucesso(index) {
        this.sucessos.splice(this.erros.indexOf(index), 1);
    }

    public onSubmit(values: Object): void {
        var resp: any;
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        var msgSucesso: any = {
            item: '',
            descricao: ''
        };


        if (this.form.valid) {

            this.estabelecimento.endereco.endereco_rua = values['rua'];
            this.estabelecimento.endereco.endereco_numero = values['numero'];
            this.estabelecimento.endereco.endereco_complemento = values['complemento'];
            this.estabelecimento.endereco.endereco_bairro = values['bairro'];
            this.estabelecimento.endereco.endereco_cep = values['cep'];
            this.estabelecimento.endereco.estado_id = values['estado'];
            this.estabelecimento.endereco.cidade_id = values['cidade'];

            this.enderecoService.atualizarEndereco(this.estabelecimento.endereco).subscribe(
                endereco => {
                    resp = endereco['response'];
                    if (resp.status == 'true') {
                        msgSucesso.item = 'parabéns endereço atualizado com sucesso!';
                        msgSucesso.descricao = resp.descricao;
                        this.sucessos.push(msgSucesso);
                    }
                    else {
                        msgErro.item = 'Erro ao salvar o endereço do estabelecimento!';
                        msgErro.descricao = resp.descricao;
                        this.erros.push(msgErro);
                    }
                },
                err => {
                    msgErro.item = 'Erro ao salvar o endereço do estabelecimento!';
                    msgErro.descricao = err;
                    this.erros.push(msgErro);
                }
            );
        }
        else {
            this.rua.markAsTouched()
            this.numero.markAsTouched()
            this.complemento.markAsTouched()
            this.bairro.markAsTouched()
            this.cep.markAsTouched()
            this.estado.markAsTouched()
            this.cidade.markAsTouched()
        }
    }

    public listarEstados() {
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        this.estadoService.listarTodos().subscribe(
            estados => {
                this.estados = estados['estados'];
            },
            err => {

                msgErro.item = 'Erro ao listar Estados!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );

    }

    public selecionarEstadoSigla(estadoSigla) {
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        var estado: any;
        this.estadoService.listarPorSigla(estadoSigla).subscribe(
            estado => {

                estado = estado['estado'];
                this.estado.setValue(estado['estado_id']);
                this.listarCidades();
            },
            err => {

                msgErro.item = 'Erro ao listar Estado pela Sigla!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );

    }

    public selecionarCidadeNome(estadoSigla, cidadeNome) {
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        var estado: any;
        this.cidadeService.getCidadesPorDescricaoEstado(estadoSigla, cidadeNome).subscribe(
            cidade => {

                cidade = cidade['cidade'];
                this.cidade.setValue(cidade['cidade_id']);
            },
            err => {

                msgErro.item = 'Erro ao listar Cidade pelo nome!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );

    }

    public listarCidades() {
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        this.cidade.setValue('');
        this.cidadeService.listarTodos(this.estado.value).subscribe(
            cidades => {

                this.cidades = cidades['cidades'];
            },
            err => {

                msgErro.item = 'Erro ao listar Cidades!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            });
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
                    this.estabelecimento = resp.objeto[0];
                    this.rua.setValue(this.estabelecimento.endereco.endereco_rua);
                    this.numero.setValue(this.estabelecimento.endereco.endereco_numero);
                    this.complemento.setValue(this.estabelecimento.endereco.endereco_complemento);
                    this.bairro.setValue(this.estabelecimento.endereco.endereco_bairro);
                    this.cep.setValue(this.estabelecimento.endereco.endereco_cep);
                    this.selecionarEstadoSigla(this.estabelecimento.endereco.estado_sigla);
                    this.selecionarCidadeNome(this.estabelecimento.endereco.estado_sigla, this.estabelecimento.endereco.cidade_descricao)
                }
                else {
                    msgErro.item = 'Erro ao carregar endereço do estabelecimento!';
                    msgErro.descricao = resp.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {

                msgErro.item = 'Erro ao carregar endereço do estabelecimento!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }

    public buscarCep() {
        var msgErro: any = {
            item: '',
            descricao: ''
        };

        this.cepService.getEnderecoCep(this.cep.value).subscribe(
            endereco => {

                if (endereco) {
                    if (!endereco['erro']) {
                        this.rua.setValue(endereco['logradouro']);
                        this.complemento.setValue(endereco['complemento']);
                        this.bairro.setValue(endereco['bairro']);
                        this.selecionarEstadoSigla(endereco['uf']);
                        this.selecionarCidadeNome(endereco['uf'], endereco['localidade'])
                    }
                    else {
                        this.rua.setValue('');
                        this.complemento.setValue('');
                        this.bairro.setValue('');
                    }

                }
            },
            err => {
                msgErro.item = 'Erro ao buscar cep!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            });
    }

}

export function cepValidator(control: FormControl): { [key: string]: any } {
    var cepRegexp = /[0-9]{8,8}$/;
    if (control.value && !cepRegexp.test(control.value)) {
        return { invalidCep: true };
    }
}
