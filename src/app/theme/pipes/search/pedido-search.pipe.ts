import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'PedidoSearchPipe', pure: false })
export class PedidoSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(pedido => {
        if (pedido.pedido.spedido_codigo) {
          return pedido.pedido_codigo.search(searchText) !== -1;
        }
        else{
          return pedido.pedido_codigoo.search(searchText) !== -1;
        }
      });
    }
  }
}