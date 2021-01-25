import { RestService } from '@angular.builders/data';
import { Card } from '@angular.builders/ui';
import { Injectable } from '@angular/core';
import { Item } from '../models/Resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private endPoint = 'resources';
  constructor(private rest: RestService<Item>) {}

  getFeatured$() {
    return this.rest.getAll$(this.endPoint);
  }

  getById$(id: string) {
    return this.rest.getById$(this.endPoint, id);
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
