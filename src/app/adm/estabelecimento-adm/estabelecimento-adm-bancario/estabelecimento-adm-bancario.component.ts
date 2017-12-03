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

/** Services */


@Component({
    selector: 'app-estabelecimento-adm-bancario',
    templateUrl: './estabelecimento-adm-bancario.component.html',
    styleUrls: ['./estabelecimento-adm-bancario.component.scss'],
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

export class EstabelecimentoAdmBancarioComponent implements OnInit {
    public router: Router;
    public form: FormGroup;
    public erros: Array<any> = [];
    public sucessos: Array<any> = [];
    public formSubmit: any;

    public banco: any;
    public codigoBanco: any;
    public agencia: any;
    public contaCorrente: any;

    constructor(router: Router,
        fb: FormBuilder,
    ) {
        this.router = router;

        this.form = fb.group({
            banco: ['', Validators.compose([Validators.required])],
            codigoBanco: ['', Validators.compose([Validators.required])],
            agencia: ['', Validators.compose([Validators.required])],
            contaCorrente: ['', Validators.required],
        });

        this.banco = this.form.controls['banco'];
        this.codigoBanco = this.form.controls['codigoBanco'];
        this.agencia = this.form.controls['agencia'];
        this.contaCorrente = this.form.controls['contaCorrente'];
    }

    public ngOnInit() {

    }

    public ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    /** Ações ao enviar Formulário */
    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.cadastraContaBancaria();
        }
        else {
            this.banco.markAsTouched();
            this.codigoBanco.markAsTouched();
            this.agencia.markAsTouched();
            this.contaCorrente.markAsTouched();
        }
    }

    public cadastraContaBancaria() {
        var resp: any;
        var msgErro: any = {
            item: '',
            descricao: ''
        };

    }

    /** Ações Formulário */
    public closeAlert(index) {
        this.erros.splice(this.erros.indexOf(index), 1);
    }

    public closeAlertSucesso(index) {
        this.erros.splice(this.sucessos.indexOf(index), 1);
    }


}




