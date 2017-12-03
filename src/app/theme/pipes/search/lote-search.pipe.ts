import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'LoteSearchPipe', pure: false })
export class LoteSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(lote => {
        if (lote.produto_descricao) {
          return lote.produto_descricao.search(searchText) !== -1;
        }
        else{
          return lote.produto_descricao.search(searchText) !== -1;
        }
      });
    }
  }
}

