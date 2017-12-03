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
export class AcessoService {

	private path = 'acesso/';

	constructor(private http: Http, private httpUtil: HttpUtilService) {
	}

	//autentica usuario comprador
	public autenticar(login: any): Observable<any> {
		var params = {
			usuario_login: login.email,
			usuario_senha: login.password
		};

		return this.http.post(this.httpUtil.url(this.path) + "autenticar", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	//autentica login smarket
	public autenticarUsuarioSmarket(login: any): Observable<any> {
		var params = {
			usuario_login: login.email,
			usuario_senha: login.password
		};

		return this.http.post(this.httpUtil.url(this.path) + "autenticarAdm", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	//recupera senha
	public recuperarSenha(email: any): Observable<any> {
		var params = {
			email_descricao: email.email
		};

		return this.http.post(this.httpUtil.url(this.path) + "recuperarSenha", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	//recupera senha
	public redefinirSenha(usuario: any): Observable<any> {

		var params = {
			usuario_id: usuario.id,
			tipo_usuario_id: usuario.tipo_usuario,
			usuario_senha_consirma: usuario.senha_confirma,
			usuario_senha: usuario.senha
		};

		return this.http.post(this.httpUtil.url(this.path) + "redefinirSenha", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	public autenticarFacebook(login: any): Observable<any> {

		var params = {
			usuario_login: login.email,
			origin: 1,
			nome: login.first_name,
			sobrenome: login.last_name
		};

		return this.http.post(this.httpUtil.url(this.path) + "autenticarFacebook", params)
			.map(this.httpUtil.extrairDados)
			.catch(this.httpUtil.processarErros);
	}

	public usuarioAdmEstaAutenticado() {
		var autentica = localStorage.getItem('autenticaAdm');
		if(autentica && autentica == 'Adm'){
			return true;
		}
		return false;
	}

	public usuarioSmarketEstaAutenticado() {
		var autentica = localStorage.getItem('autenticaSmarket');
		if(autentica && autentica == 'Smarket'){
			return true;
		}
		return false;
	}

	public usuarioShopEstaAutenticado() {
		var autentica = localStorage.getItem('autenticaShop');
		if(autentica && autentica == 'Shop'){
			return true;
		}
		return false;
	}

	public usuarioDoacaoEstaAutenticado() {
		var autentica = localStorage.getItem('autenticaDoacao');
		if(autentica && autentica == 'Doacao'){
			return true;
		}
		return false;
	}

	public usuarioZeroEstaAutenticado() {
		var autentica = localStorage.getItem('autenticaZero');
		if(autentica && autentica == 'Zero'){
			return true;
		}
		return false;
	}

	public liberaAcessoAdm(usuario, estabelecimento_id) {
		
		usuario.estabelecimento_id = estabelecimento_id;
		console.log(estabelecimento_id);
		console.log(usuario);
		localStorage.setItem('usuarioAdm', JSON.stringify(usuario));
		localStorage.setItem('autenticaAdm', 'Adm');
	}

	public liberaAcessoSmarket(usuario) {
		localStorage.setItem('usuarioSmarket', JSON.stringify(usuario));
		localStorage.setItem('autenticaSmarket', 'Smarket');
	}

	public liberaAcessoShop(usuario) {
		localStorage.setItem('usuarioShop', JSON.stringify(usuario));
		localStorage.setItem('autenticaShop', 'Shop');
	}

	public liberaAcessoZero(usuario) {
		localStorage.setItem('usuarioZero', JSON.stringify(usuario));
		localStorage.setItem('autenticaZero', 'Zero');
	}

	public liberaAcessoDoacao(usuario) {
		localStorage.setItem('usuarioDoacao', JSON.stringify(usuario));
		localStorage.setItem('autenticaDoacao', 'Doacao');
	}

	public logoutAreaSmarket() {
		localStorage.clear();
	}

	public logoutAreaAdm() {
		localStorage.clear();
	}

	public logoutAreaShop() {
		localStorage.clear();
	}

	public logoutAreaZero() {
		localStorage.clear();
	}

	public logoutAreaDoacao() {
		localStorage.clear();
	}
}