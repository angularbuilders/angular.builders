import { ApiConfig, RestService } from '@angular.builders/data';
import { Card } from '@angular.builders/ui';
import { Injectable, InjectionToken } from '@angular/core';
import { Category } from '../models/Category';

export const API_CONFIG = new InjectionToken<ApiConfig>('');

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private endPoint = 'categories';
  constructor(private rest: RestService<Category>) {}

  getAll$() {
    return this.rest.getAll$(this.endPoint);
  }
  getItemsCountById(categoryId: string) {
    const query = `categoryId=${categoryId}`;
    return this.rest.getCountByQuery$('items', query);
  }
  transformToCards(item: Category[]): Card[] {
    return item.map((item: Category) => {
      return {
        url: `./search`,
        params: { term: item['id'], sortBy: 'name' },
        title: item['name'],
        description: item['description'] || '',
      };
    });
  }
}
