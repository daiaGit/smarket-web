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
export class PedidoService {

    private path = 'pedido/';

    constructor(private http: Http, private httpUtil: HttpUtilService) {
    }

    /** Seleciona os pedidos pelo id do estabelecimento */
    getPedidosPorEstabelecimento(): Observable<any[]> {

        var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

        return this.http.get(this.httpUtil.url(this.path) + "getPedidosPorEstabelecimento/" + usuario.estabelecimento_id)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Seleciona todos os pedidos */
    getPedidos(): Observable<any[]> {
        return this.http.get(this.httpUtil.url(this.path) + "getPedidos/")
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    getStatusPedido(): Observable<any[]> {

        return this.http.get(this.httpUtil.url(this.path) + "getStatusPedido/")
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }

    /** Atualiza os status dos pedidos */
    atualizarStatusPedido(pedido_id, status_pedido_id): Observable<any[]> {

        var params = {
            pedido_id: pedido_id,
            status_pedido_id: status_pedido_id

        };

        return this.http.post(this.httpUtil.url(this.path) + "atualizarStatusPedido", params)
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }


}


