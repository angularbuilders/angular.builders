import { RestService } from '@angular.builders/data';
import { Card } from '@angular.builders/ui';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { SearchParams } from '../models/SearchParams';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private endPoint = 'items';
  constructor(private rest: RestService<Item>) {}

  getFeatured$() {
    return this.rest.getAll$(this.endPoint);
  }

  getById$(id: string) {
    return this.rest.getById$(this.endPoint, id);
  }

  getByQuery$(searchParams: SearchParams) {
    const query = `q=${searchParams.term}`;
    return this.rest.getByQuery$(this.endPoint, query);
  }

  save$(item: Item) {
    return this.rest.post$(this.endPoint, item);
  }

  transformToCards(item: Item[]): Card[] {
    return item.map((item: Item) => {
      return {
        url: `./items/${item['id']}`,
        title: item['name'],
        description: item['description'] || '',
      };
    });
  }
}
