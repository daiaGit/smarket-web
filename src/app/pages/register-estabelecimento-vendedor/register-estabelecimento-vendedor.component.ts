
/** Angular */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OnInit } from '@angular/core';

/** Services */
import { TipoTelefoneService } from './../../services/tipos-telefone.service';
import { EstabelecimentoService } from './../../services/estabelecimento.service';
import { CargoService } from './../../services/cargo.service';
import { TiposEstabelecimentoService } from './../../services/tipos-estabelecimento.service';
import { CidadeService } from './../../services/cidade.service';
import { TermoUsoService } from './../../services/termo-uso.service';
import { EstadoService } from './../../services/estado.service';
import { Select2Component } from 'angular-select2-component';
import { CepService } from './../../services/cep.service';

@Component({
    selector: 'app-register-estabelecimento-vendedor',
    templateUrl: './register-estabelecimento-vendedor.component.html',
    styleUrls: ['./register-estabelecimento-vendedor.component.scss'],
    providers: [
        TipoTelefoneService,
        EstabelecimentoService,
        TiposEstabelecimentoService,
        CargoService,
        CidadeService,
        EstadoService,
        TermoUsoService,
        CepService
    ],
    encapsulation: ViewEncapsulation.None
})

export class RegisterEstabelecimentoVendedorComponent implements OnInit {
    public router: Router;
    public form: FormGroup;
    public erros: Array<any> = []; 
    public formSubmit: any;

    public tiposTelefone: Array<any> = [];
    public tiposEstabelecimento: Array<any> = [];
    public cargos: Array<any> = [];
    public estados: Array<any> = [];
    public cidades: Array<any> = [];
    public endereco: any = '';
    public termoUso: any;

    public maskFone: any = {
        mask: '',
        placeholder: ''
    };
    public passwordType: any = '';;
    public passwordConfirmType: any = '';
    public confirmTermUso: any = {
        status: false,
        validate: false
    };

    public cnpj: AbstractControl;
    public razaoSocial: AbstractControl;
    public nomeFantasia: AbstractControl;
    public inscricaoEstadual: AbstractControl;
    public inscricaoMunicipal: AbstractControl;
    public tipoEstabelecimento: AbstractControl;
    public funcionarioNome: AbstractControl;
    public funcionarioSobrenome: AbstractControl;
    public funcionarioCpf: AbstractControl;
    public funcionarioEmail: AbstractControl;
    public funcionarioCargo: AbstractControl;
    public ddd: AbstractControl;
    public telefone: AbstractControl;
    public tipoTelefone: AbstractControl;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;
    public rua: AbstractControl;
    public numero: AbstractControl;
    public complemento: AbstractControl;
    public bairro: AbstractControl;
    public cep: AbstractControl;
    public estado: AbstractControl;
    public cidade: AbstractControl;

    constructor(router: Router,
        fb: FormBuilder,
        public tipoTelefoneService: TipoTelefoneService,
        public estabelecimentoService: EstabelecimentoService,
        public tiposEstabelecimentoService: TiposEstabelecimentoService,
        public cargoService: CargoService,
        public cidadeService: CidadeService,
        public estadoService: EstadoService,
        public termoUsoService: TermoUsoService,
        public cepService: CepService
    ) {

        this.router = router;

        this.form = fb.group({
            cnpj: ['', Validators.compose([Validators.required, cnpjValidator])],
            razaoSocial: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
            nomeFantasia: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
            tipoEstabelecimento: ['', Validators.required],
            funcionarioCargo: ['', Validators.required],
            funcionarioNome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
            funcionarioSobrenome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
            funcionarioCpf: ['', Validators.compose([Validators.required, cpfValidator])],
            funcionarioEmail: ['', Validators.compose([Validators.required, emailValidator])],
            tipoTelefone: ['', Validators.required],
            ddd: ['', Validators.compose([Validators.required, dddValidator])],
            telefone: ['', Validators.compose([Validators.required, foneValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            rua: ['', Validators.required],
            numero: ['', Validators.required],
            complemento: [''],
            bairro: ['', Validators.required],
            cep: ['', Validators.compose([Validators.required, cepValidator])],
            estado: ['', Validators.required],
            cidade: ['', Validators.required],
            inscricaoMunicipal: [''],
            inscricaoEstadual: ['', Validators.required]
        },
            {
                validator: matchingPasswords('password', 'confirmPassword')
            });

        this.cnpj = this.form.controls['cnpj'];
        this.razaoSocial = this.form.controls['razaoSocial'];
        this.nomeFantasia = this.form.controls['nomeFantasia'];
        this.tipoEstabelecimento = this.form.controls['tipoEstabelecimento'];
        this.funcionarioCargo = this.form.controls['funcionarioCargo'];
        this.funcionarioNome = this.form.controls['funcionarioNome'];
        this.funcionarioSobrenome = this.form.controls['funcionarioSobrenome'];
        this.funcionarioCpf = this.form.controls['funcionarioCpf'];
        this.funcionarioEmail = this.form.controls['funcionarioEmail'];
        this.tipoTelefone = this.form.controls['tipoTelefone'];
        this.ddd = this.form.controls['ddd'];
        this.telefone = this.form.controls['telefone'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
        this.rua = this.form.controls['rua'];
        this.numero = this.form.controls['numero'];
        this.complemento = this.form.controls['complemento'];
        this.bairro = this.form.controls['bairro'];
        this.cep = this.form.controls['cep'];
        this.estado = this.form.controls['estado'];
        this.cidade = this.form.controls['cidade'];
        this.inscricaoMunicipal = this.form.controls['inscricaoMunicipal'];
        this.inscricaoEstadual = this.form.controls['inscricaoEstadual'];

        this.maskFone.mask = '0000-0000';
        this.maskFone.placeholder = 'XXXX-XXXX';
        this.passwordType = 'password';
        this.passwordConfirmType = 'password';
    }

    public ngOnInit() {
        this.listarTiposTelefone();
        this.listarTiposEstabelecimento();
        this.listarCargos();
        this.listarEstados();
        this.ExibirTermoUso();
    }

    public ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    /** Ações ao enviar Formulário */
    public onSubmit(values: Object): void {
        if (this.form.valid && this.confirmTermUso.status) {           
            this.cadastrarEstabelecimento(values);
            this.router.navigate(['/sucesso-cadastro']);
        }
        else{
            this.cnpj.markAsTouched();
            this.confirmPassword.markAsTouched();
            this.ddd.markAsTouched();
            this.funcionarioCargo.markAsTouched();
            this.funcionarioCpf.markAsTouched();
            this.funcionarioEmail.markAsTouched();
            this.funcionarioNome.markAsTouched();
            this.funcionarioSobrenome.markAsTouched();
            this.nomeFantasia.markAsTouched();
            this.password.markAsTouched();
            this.razaoSocial.markAsTouched();
            this.telefone.markAsTouched();
            this.tipoEstabelecimento.markAsTouched();
            this.tipoTelefone.markAsTouched();
            this.rua.markAsTouched();
            this.numero.markAsTouched();
            this.complemento.markAsTouched();
            this.bairro.markAsTouched();
            this.cep.markAsTouched();
            this.estado.markAsTouched();
            this.cidade.markAsTouched();
            this.inscricaoMunicipal.markAsTouched();
            this.inscricaoEstadual.markAsTouched();
        }
    }

    public cadastrarEstabelecimento(estabelecimento: any) {
        var resp: any;
        var msgErro: any = {
            item : '',
            descricao: ''
        };

        this.estabelecimentoService.setEstabelecimentoVendedor(estabelecimento).subscribe(
            estabelecimento => {
                resp = estabelecimento['response'];
                this.formSubmit.status = resp['status'];
                this.formSubmit.descricao = resp['descricao'];
                if (this.formSubmit.status == 'true') {
                    this.router.navigate(['/sucesso-cadastro']);
                }
                else {
                    msgErro.item = 'Erro ao efetuar o cadastro!';
                    msgErro.descricao = this.formSubmit.descricao;
                    this.erros.push(msgErro);
                }
            },
            err => {
                msgErro.item = 'Erro ao cadastrar estabelecimento!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );
    }

    /** Ações Formulário */
    public closeAlert(index) {
        this.erros.splice(this.erros.indexOf(index), 1);
    }

    setMaskFone() {           
        if(this.tipoTelefone.value == 2){
            this.maskFone.mask = '00000-0000';
            this.maskFone.placeholder = 'XXXXX-XXXX';  
        }
        else{
            this.maskFone.mask = '0000-0000';
            this.maskFone.placeholder = 'XXXX-XXXX'; 
        }
    }

    setTypePassword(type) {
        this.passwordType = type;
    }

    setTypePasswordConfirm(type) {
        this.passwordConfirmType = type;
    }

    public ExibirTermoUso() {
        this.termoUso = this.termoUsoService.listarTermoUso();
    }

    confirmarTermoUso(){ 
        if(this.confirmTermUso.status){
            this.confirmTermUso.status = false;
        }
        else{
            this.confirmTermUso.status = true;
        }
    }

    /** Listar Conteúdo */
    public listarTiposTelefone() {
        var msgErro: any = {
            item : '',
            descricao: ''
        };

        this.tipoTelefoneService.listarTodos().subscribe(
            tiposTelefone => {
                this.tiposTelefone = tiposTelefone['tiposTelefone'];
            },
            err => {
                msgErro.item = 'Erro ao listar tipos de Telefone!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );

    }

    public listarTiposEstabelecimento() {
        var msgErro: any = {
            item : '',
            descricao: ''
        };

        this.tiposEstabelecimentoService.listarTodos().subscribe(
            tiposEstabelecimento => {
                this.tiposEstabelecimento = tiposEstabelecimento['tiposEstabelecimento'];
            },            
            err => {
                msgErro.item = 'Erro ao listar tipos de Estabelecimento!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );

    }

    public listarCargos() {
        var msgErro: any = {
            item : '',
            descricao: ''
        };

        this.cargoService.listarTodos().subscribe(
            cargos => {
                this.cargos = cargos['cargo'];
            },
            err => {
                msgErro.item = 'Erro ao listar Cargos!';
                msgErro.descricao = err;
                this.erros.push(msgErro);
            }
        );

    }

    public listarEstados() {
        var msgErro: any = {
            item : '',
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
            item : '',
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
            item : '',
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
            item : '',
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




    public buscarCep() {
        var msgErro: any = {
            item : '',
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

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}


export function cnpjValidator(control: FormControl): { [key: string]: any } {
    var cnpj = control.value;
    var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    var resp = true;
    
        if((cnpj = cnpj.replace(/[^\d]/g,"")).length != 14){
            resp = false;
        }
            
    
        if(/0{14}/.test(cnpj)){
            resp = false;
        }
    
        for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);

        if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n)){
            resp = false;
        }
           
        for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);

        if(cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n)){
            resp = false;
        }
        

        if (!resp) {
            return { invalidCnpj: true };
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

export function cepValidator(control: FormControl): { [key: string]: any } {
    var cepRegexp = /[0-9]{8,8}$/;
    if (control.value && !cepRegexp.test(control.value)) {
        return { invalidCep: true };
    }
}
