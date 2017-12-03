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
export class TermoUsoService {
  
	constructor(private http: Http, private httpUtil: HttpUtilService) {
	}
 
	listarTermoUso(): any { 
		var termoUso: any = ''

		termoUso=
		'<p>'
			+'Esse site é operado pelo Smarketapp. Em todo o site, os termos “nós”, “nos” e “nosso” se referem ao Smarketapp. O Smarketapp'
			+'proporciona esse site, incluindo todas as informações, ferramentas e serviços disponíveis'
			+'deste site para você, o usuário, com a condição da sua aceitação de todos os termos,'
			+'condições, políticas e avisos declarados aqui.'
		+'</p>'
		+'<p>'
			+'Ao visitar nosso site e/ou comprar alguma coisa no nosso site, você está utilizando nossos “Serviços”. Consequentemente,'
			+'você concorda com os seguintes termos e condições (“Termos de serviço”, “Termos”), incluindo'
			+'os termos e condições e políticas adicionais mencionados neste documento e/ou disponíveis'
			+'por hyperlink. Esses Termos de serviço se aplicam a todos os usuários do site, incluindo,'
			+'sem limitação, os usuários que são navegadores, fornecedores, clientes, lojistas e/ou'
			+'contribuidores de conteúdo.'
		+'</p>'
		+'<p>'
			+'Por favor, leia esses Termos de serviço cuidadosamente antes de acessar ou utilizar o nosso site. Ao acessar ou usar qualquer'
			+'parte do site, você concorda com os Termos de serviço. Se você não concorda com todos'
			+'os termos e condições desse acordo, então você não pode acessar o site ou usar quaisquer'
			+'serviços. Se esses Termos de serviço são considerados uma oferta, a aceitação é expressamente'
			+'limitada a esses Termos de serviço.'
		+'</p>'
		+'<p>'
			+'Quaisquer novos recursos ou ferramentas que forem adicionados à loja atual também devem estar sujeitos aos Termos de serviço.'
			+'Você pode revisar a versão mais atual dos Termos de serviço quando quiser nesta página.'
			+'Reservamos o direito de atualizar, alterar ou trocar qualquer parte desses Termos de'
			+'serviço ao publicar atualizações e/ou alterações no nosso site. É sua responsabilidade'
			+'verificar as alterações feitas nesta página periodicamente. Seu uso contínuo ou acesso'
			+'ao site após a publicação de quaisquer alterações constitui aceitação de tais alterações.'
		+'</p>'
		+'<p>'
			+'Nossa loja é hospedada no Umbler. Eles nos fornecem uma plataforma de e-commerce online que nos permite vender nossos produtos'
			+'e serviços.'
		+'</p>';

		return termoUso;
	}
		
	
}