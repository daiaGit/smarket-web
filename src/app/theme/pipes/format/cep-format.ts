import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CepFormat', pure: false })
export class CepFormatPipe implements PipeTransform {

  transform(value: string) {
    if (value) {
      value = value.toString();
      if (value.length === 8) {
        return value.substring(0, 5).concat("-")
          .concat(value.substring(5, 8))
      }
    }
    return value;
  }
  
}