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
export class ConsumidorService {

	private path = 'consumidor/';

	constructor(private http: Http, private httpUtil: HttpUtilService) {
	}

	setConsumidor(consumidor: any): Observable<any> {

		var params = {
			tipo_usuario_id: 2,
			consumidor_nome: consumidor.nome,
			consumidor_sobrenome: consumidor.sobrenome,
			email_descricao: consumidor.email,
			tipo_telefone_id: consumidor.tipoTelefone,
			telefone_ddd: consumidor.ddd,
			telefone_numero: consumidor.telefone,
			usuario_senha: consumidor.password
		};

		return this.http.post(this.httpUtil.url(this.path) + "adicionar", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	adicionarFotoUsuario(foto_usuario): Observable<any[]> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			usuario_id: usuario.usuario_id,
			tipo_usuario_id: usuario.tipo_usuario_id,
			foto_usuario: foto_usuario
		};

		return this.http.post(this.httpUtil.url(this.path) + "adicionarFotoUsuario/", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	getConsumidor(usuario_id, tipo_usuario_id): Observable<any[]> {

		return this.http.get(this.httpUtil.url(this.path) + "getConsumidor/" + usuario_id + '/' + tipo_usuario_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}


}