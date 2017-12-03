import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class HttpUtilService {
 
	private API_URL: string = 'https://www.mlprojetos.com/webservice/index.php/';
 
	url(path: string) {
		return this.API_URL + path;
	}
 
	headers() {
		let headersParams = { 'Content-Type': 'application/json' };
		if (localStorage['token']) {
			headersParams['Authorization'] = localStorage['token'];
		}
		let headers = new Headers(headersParams);
    	let options = new RequestOptions({ headers: headers });
    	return options;
	}
 
	extrairDados(response: Response) {
		let data = response.json();
    	return data || {};
  	}
 
  	processarErros(erro: any) {
		let err = (erro.message) ? erro.message :
		erro.status ? `${erro.status} - ${erro.statusText}` : 'Server error';
		return Observable.throw(err);
	}
}


