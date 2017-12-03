import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FuncionarioSearchPipe', pure: false })
export class FuncionarioSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(funcionario => {
        if (funcionario.funcionario_nome) {
          return funcionario.funcionario_nome.search(searchText) !== -1;
        }
        else{
          return funcionario.funcionario_nome.search(searchText) !== -1;
        }
      });
    }
  }
}