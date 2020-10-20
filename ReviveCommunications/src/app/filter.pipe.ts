import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(DiscList: any[] , searchText: string): any[] {

    if (!DiscList) {
      return [];
    }
    if (!searchText) {
      return DiscList;
    }
    searchText = searchText.toLocaleLowerCase();

    return DiscList.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

}

