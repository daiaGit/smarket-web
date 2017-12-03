import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ProdutoSearchPipe', pure: false })
export class ProdutoSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(produto => {
        if (produto.produto_descricao) {
          return produto.produto_descricao.search(searchText) !== -1;
        }
        else{
          return produto.produto_descricao.search(searchText) !== -1;
        }
      });
    }
  }
}