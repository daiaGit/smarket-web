import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CategoriaSearchPipe', pure: false })
export class CategoriaSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(categoria => {
        if (categoria.categoria_descricao) {
          return categoria.categoria_descricao.search(searchText) !== -1;
        }
        else{
          return categoria.categoria_descricao.search(searchText) !== -1;
        }
      });
    }
  }
  
}