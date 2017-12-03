import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtilService } from './http-util.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class EnderecoService {

    private path = 'endereco/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {
    }


    atualizarEndereco(endereco: any): Observable<any[]> {
       
        var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));
        
        var params = {
            endereco_id: endereco.endereco_id,
            endereco_rua: endereco.endereco_rua,
            endereco_numero: endereco.endereco_numero,
            endereco_complemento: endereco.endereco_complemento,
            endereco_bairro: endereco.endereco_bairro,
            endereco_cep: endereco.endereco_cep,
            estado_id: endereco.estado_id,
            cidade_id: endereco.cidade_id
        };

        return this.http.post(this.httpUtil.url(this.path) + "alterarEndereco/", params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);

    }

}


