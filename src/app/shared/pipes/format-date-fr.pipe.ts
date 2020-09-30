import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { isMoment } from 'moment';

@Pipe({
  name: 'formatDateFr'
})
export class FormatDateFrPipe implements PipeTransform {

  transform(date: string, format: 'YYYY-MM-DD'): string {
    if (date && format) {
      if (moment(date, 'YYYY-MM-DD').isValid()) return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    return null;
  }

}
