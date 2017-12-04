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
export class ProdutoService {

	private path = 'produto/';

	constructor(private http: Http, private httpUtil: HttpUtilService) {

	}


	getProdutosByEstabelecimento(): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "getProdutosByEstabelecimento/" + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	getProdutosEstabelecimento(): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "getProdutosEstabelecimento/" + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	getLotesByEstabelecimento(): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "getLotesByEstabelecimento/" + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	getUnidadesMedidas(): Observable<any> {

		return this.http.get(this.httpUtil.url(this.path) + "getUnidadesMedidas")
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setProduto(produto: any, image: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			estabelecimento_id: usuario.estabelecimento_id,
			produto_descricao: produto.produto_descricao,
			produto_img_b64: image,
			marca_id: produto.marca_id,
			categoria_id: produto.categoria_id,
			unidade_medida_id: produto.unidade_medida_id,
			sub_categoria_id: produto.sub_categoria_id,
			quantidade: produto.quantidade
		};

		return this.http.post(this.httpUtil.url(this.path) + "adicionarProduto", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	alterarProduto(produto: any, image: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		var params = {
			produto_id: produto.produto_id,
			estabelecimento_id: usuario.estabelecimento_id,
			produto_descricao: produto.produto_descricao,
			produto_img_b64: image.changingThisBreaksApplicationSecurity,
			marca_id: produto.marca_id,
			categoria_id: produto.categoria_id,
			unidade_medida_id: produto.unidade_medida_id,
			sub_categoria_id: produto.sub_categoria_id,
			quantidade: produto.quantidade
		};

		return this.http.post(this.httpUtil.url(this.path) + "alterarProduto", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	setLote(lote: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));
		var vender_para: number;

		if (lote.vender_para_pf && lote.vender_para_pj) {
			vender_para = 3;
		}
		else if (lote.vender_para_pf) {
			vender_para = 1;
		}
		else if (lote.vender_para_pj) {
			vender_para = 2;
		}

		var params = {
			produto_id: lote.produto_id,
			estabelecimento_id: usuario.estabelecimento_id,
			lote_data_fabricacao: lote.lote_data_fabricacao,
			lote_data_vencimento: lote.lote_data_vencimento,
			lote_preco: lote.lote_preco,
			lote_obs: lote.lote_obs,
			lote_quantidade: lote.lote_quantidade,
			qtd_minima_pj: lote.qtd_minima_pj,
			qtd_minima_pf: lote.qtd_minima_pf,
			vender_para: vender_para
		};

		return this.http.post(this.httpUtil.url(this.path) + "adicionarLote", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	doUploadProduto(planilhaProduto: any): Observable<any> {

		var params = {
			file: planilhaProduto
		};

		return this.http.post(this.httpUtil.url(this.path) + "do_upload/", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	desativarProduto(idProduto: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "desativarProduto/" + idProduto + '/' + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	ativarProduto(idProduto: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "ativarProduto/" + idProduto + '/' + usuario.estabelecimento_id)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	atualizarStatusLote(idLote: any, status: any): Observable<any> {

		var usuario = JSON.parse(localStorage.getItem('usuarioAdm'));

		return this.http.get(this.httpUtil.url(this.path) + "alterarStatusLote/" + idLote + '/' + usuario.estabelecimento_id + '/' + status)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}
}