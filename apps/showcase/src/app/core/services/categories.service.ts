import { ApiConfig, RestService } from '@angular.builders/data';
import { Injectable, InjectionToken } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from '../models/Category';

export const API_CONFIG = new InjectionToken<ApiConfig>('');

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private endPoint = 'categories';
  constructor(private rest: RestService<Category>) {}

  getAll$() {
    return this.rest.getAll$(this.endPoint).pipe(
      map((resources: Category[]) => {
        return resources.map((category: Category) => {
          return {
            title: category.name,
            description: category.description || '',
          };
        });
      })
    );
  }
}
