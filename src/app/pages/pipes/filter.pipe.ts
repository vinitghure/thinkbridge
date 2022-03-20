import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    const matchingData = items.filter(item => {
      return Object.keys(item).find(i => {
        if (!!item[i] && item[i].toString().toLowerCase().includes(value.toLowerCase())) {
          return item;
        }
      });
    });
    return matchingData;
  }

}
