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
export class FuncionarioService {

	private path = 'funcionario/';

	constructor(private http: Http, private httpUtil: HttpUtilService) {

	}

	/** Lista Funcionarios por Estabelecimento */
	getFuncionarioPorEstabeleciemento(): Observable<any[]> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "getFuncionarioPorEstabelecimento/" + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	/** Lista Funcionario por Id */
	getFuncionario(): Observable<any[]> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "getFuncionario/" + usuario.usuario_id + '/' + + usuario.tipo_usuario_id + '/' + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}


	/** Adicionar Funcionario */
	setFuncionarios(funcionario: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			tipo_usuario_id: 5,
			funcionario_nome: funcionario.funcionario_nome,
			funcionario_sobrenome: funcionario.funcionario_sobrenome,
			funcionario_cpf: funcionario.funcionario_cpf,
			cargo_id: funcionario.cargo_id,
			email_descricao: funcionario.email_descricao,
			tipo_telefone_id: funcionario.tipo_telefone_id,
			telefone_ddd: funcionario.telefone_ddd,
			telefone_numero: funcionario.telefone_numero,
			estabelecimento_id: usuario.estabelecimento_id
		}

		return this.http.post(this.httpUtil.url(this.path) + 'adicionar', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	/** Alterar dados do funcionário */
	alterarDadosFuncionario(funcionario: any): Observable<any> {

		console.log(funcionario);

		var params = {
			usuario_id: funcionario.usuario_id,
			tipo_usuario_id: funcionario.tipo_usuario_id,
			funcionario_nome: funcionario.funcionario_nome,
			funcionario_sobrenome: funcionario.funcionario_sobrenome,
			cargo_id: funcionario.cargo_id,
			email_descricao: funcionario.email_descricao,
			tipo_telefone_id: funcionario.tipo_telefone_id,
			telefone_ddd: funcionario.telefone_ddd,
			telefone_numero: funcionario.telefone_numero
		}

		return this.http.post(this.httpUtil.url(this.path) + 'alterarDadosFuncionario', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

}