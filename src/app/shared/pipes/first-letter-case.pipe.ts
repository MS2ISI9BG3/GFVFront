import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCase'
})
export class FirstLetterCasePipe implements PipeTransform {

  transform(value: string): any {
    if (value.length > 0) return value.charAt(0).toLocaleUpperCase()+value.slice(1);
    return value;
  }

}
