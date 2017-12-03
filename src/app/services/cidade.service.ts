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
export class CidadeService {

    private path = 'localidade/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {
    }

    listarTodos(idEstado): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + "getCidades/" + idEstado)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    getCidadeById(cidadeId): Observable<any[]> {

        return this.http.get(this.httpUtil.url(this.path) + "getCidadeById" + cidadeId)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);

    }

    getCidadesPorDescricaoEstado(sigla_estado, nome_cidade): Observable<any[]> {
        var params = {
            estado_sigla: sigla_estado,
            cidade_descricao: nome_cidade
        };

        return this.http.post(this.httpUtil.url(this.path) + "getCidadePorDescricaoEstado", params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);

    }

    getCidadesByLocalidade(cidade: any, raio: any): Observable<any[]> {
        var params = {
            latitude: cidade.cidade_longitude,
            longitude: cidade.cidade_latitude,
            raio: raio
        };

        return this.http.post(this.httpUtil.url(this.path) + "getCidadesByLocalidade", params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);

    }

    getCoordenadaPorCidade(nome_cidade): Observable<any[]> {
        var params = {
            cidade_descricao: nome_cidade
        };

        return this.http.post(this.httpUtil.url(this.path) + "getCidadeLocationByDescricao", params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);

    }

}


