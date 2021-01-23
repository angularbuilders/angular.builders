import { RestService } from '@angular.builders/data';
import { Card } from '@angular.builders/ui';
import { Injectable } from '@angular/core';
import { Resource } from '../models/Resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private endPoint = 'resources';
  constructor(private rest: RestService<Resource>) {}

  getFeatured$() {
    return this.rest.getAll$(this.endPoint);
  }

  transformToCards(item: Resource[]): Card[] {
    return item.map((item: Resource) => {
      return {
        title: item['name'],
        description: item['description'] || '',
      };
    });
  }
}
