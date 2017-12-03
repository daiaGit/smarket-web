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
export class EstabelecimentoService {

	private path = 'estabelecimento/';

	constructor(private http: Http, private httpUtil: HttpUtilService) {
	}

	//cadastra estabelecimento vendedor
	setEstabelecimentoVendedor(estabelecimento: any): Observable<any> {

		var params = {
			estabelecimento_cnpj: estabelecimento.cnpj,
			estabelecimento_razao_social: estabelecimento.razaoSocial,
			estabelecimento_nome_fantasia: estabelecimento.nomeFantasia,
			estabelecimento_inscricao_estadual: estabelecimento.inscricaoEstadual,
			estabelecimento_inscricao_municipal: estabelecimento.inscricaoMunicipal,
			estabelecimento_vendedor: "1",
			endereco_rua: estabelecimento.rua,
			endereco_numero: estabelecimento.numero,
			endereco_complemento: estabelecimento.complemento,
			endereco_bairro: estabelecimento.bairro,
			endereco_cep: estabelecimento.cep,
			estado_id: estabelecimento.estado,
			cidade_id: estabelecimento.cidade,
			tipo_estabelecimento_id: estabelecimento.tipoEstabelecimento,
			telefone_ddd: estabelecimento.ddd,
			telefone_numero: estabelecimento.telefone,
			tipo_telefone_id: estabelecimento.tipoTelefone,
			funcionario_nome: estabelecimento.funcionarioNome,
			funcionario_sobrenome: estabelecimento.funcionarioSobrenome,
			funcionario_cpf: estabelecimento.funcionarioCpf,
			cargo_id: estabelecimento.funcionarioCargo,
			tipo_usuario: "4",
			usuario_login: estabelecimento.usuarioLogin,
			usuario_email: estabelecimento.funcionarioEmail
		};

		return this.http.post(this.httpUtil.url(this.path) + 'adicionarVendedor', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setEstabelecimentoComprador(estabelecimento: any): Observable<any> {

		var params = {
			estabelecimento_cnpj: estabelecimento.cnpj,
			estabelecimento_razao_social: estabelecimento.razaoSocial,
			estabelecimento_nome_fantasia: estabelecimento.nomeFantasia,
			tipo_estabelecimento_id: estabelecimento.tipoEstabelecimento,
			funcionario_nome: estabelecimento.funcionarioNome,
			funcionario_sobrenome: estabelecimento.funcionarioSobrenome,
			funcionario_cpf: estabelecimento.funcionarioCpf,
			cargo_id: estabelecimento.funcionarioCargo,
			tipo_telefone_id: estabelecimento.tipoTelefone,
			telefone_ddd: estabelecimento.ddd,
			telefone_numero: estabelecimento.telefone,
			usuario_email: estabelecimento.funcionarioEmail,
			usuario_senha: estabelecimento.password,
			tipo_usuario: "3"
		};

		return this.http.post(this.httpUtil.url(this.path) + 'adicionarComprador', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setFotosEstabelecimento(estabelecimento_banner: any, estabelecimento_logo: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			estabelecimento_logo: estabelecimento_logo,
			estabelecimento_banner: estabelecimento_banner
		};

		return this.http.post(this.httpUtil.url(this.path) + 'adicionarImagens', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setTelefone(contato: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			tipo_telefone_id: contato.tipoTelefone,
			telefone_ddd: contato.ddd,
			telefone_numero: contato.telefone
		};

		return this.http.post(this.httpUtil.url(this.path) + 'adicionarTelefone', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setFormasPagamento(formaPagamento: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			forma_pagamento_id: formaPagamento
		};

		return this.http.post(this.httpUtil.url(this.path) + 'atribuirFormaPagamento', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	removeFormasPagamento(formaPagamento: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			forma_pagamento_id: formaPagamento
		};

		return this.http.post(this.httpUtil.url(this.path) + 'removerFormaPagamento', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setFormasEntrega(formaEntrega: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			tipo_entrega_id: formaEntrega
		};

		return this.http.post(this.httpUtil.url(this.path) + 'atribuirFormaEntrega', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	removeFormasEntrega(formaEntrega: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			tipo_entrega_id: formaEntrega
		};

		return this.http.post(this.httpUtil.url(this.path) + 'removerFormaEntrega', params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	getEstabelecimentoByLocalidade(latitude, longitude): Observable<any[]> {

		return this.http.get(this.httpUtil.url(this.path) + "getEstabelecimentosVendedoresLocalidade/" + latitude + "/" + longitude + "/30")
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);

	}


	getEstabelecimentoVendedor(): Observable<any[]> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "getEstabelecimentoVendedor/" + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);

	}

	getEstabelecimentoVendedorSmarket(estabelecimento_id): Observable<any[]> {

		return this.http.get(this.httpUtil.url(this.path) + "getEstabelecimentoVendedor/" + estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);

	}


	//LISTA ESTABELECIMENTOS COM APROVAÇÃO DE CADASTRO PENDENTE
	getEstabelecimentosPedentes(): Observable<any[]> {
		return this.http.get(this.httpUtil.url(this.path) + "getEstabelecimentosVendedoresPendentes")
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	//LISTA ID DO ESTABELECIMENTO PELO ID DO FUNCIONARIO
	getEstabelecimentoByFuncionario(usuario_id, tipo_usuario_id): Observable<any[]> {
		return this.http.get(this.httpUtil.url(this.path) + "getEstabelecimentoByFuncionario/" + usuario_id + "/" + tipo_usuario_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}


	setAprovacaoCadastroVendedor(aprovacao: any): Observable<any> {

		return this.http.post(this.httpUtil.url(this.path) + 'aprovarVendedor', aprovacao)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}


}