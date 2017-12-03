import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TelefoneFormat', pure: false })
export class TelefoneFormatPipe implements PipeTransform {

  transform(value: string) {
    if (value) {
      value = value.toString();
      if (value.length === 9) {
        return value.substring(0, 5).concat("-")
        .concat(value.substring(5, 9))
      }
      if (value.length === 8) {
        return value.substring(0, 4).concat("-")
          .concat(value.substring(4, 8))
      }
    }
    return value;
  }
  
}