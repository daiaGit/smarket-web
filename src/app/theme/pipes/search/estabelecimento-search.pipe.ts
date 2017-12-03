import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'EstabelecimentoSearchPipe', 
  pure: false 
})

export class EstabelecimentoSearchPipe implements PipeTransform {
  
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(estabelecimento => {
        if (estabelecimento.conjunto.estabelecimento.estabelecimento_razao_social) {
          return estabelecimento.conjunto.estabelecimento.estabelecimento_razao_social.search(searchText) !== -1;
        }
        else{
          return estabelecimento.conjunto.estabelecimento.estabelecimento_razao_social.search(searchText) !== -1;
        }
      });
    }
  }

}