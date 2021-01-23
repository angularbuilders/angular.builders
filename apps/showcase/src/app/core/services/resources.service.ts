import { RestService } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Resource } from '../models/Resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private endPoint = 'resources';
  constructor(private rest: RestService<Resource>) {}

  getFeatured$() {
    return this.rest.getAll$(this.endPoint).pipe(
      map((resources: Resource[]) => {
        return resources.map((resource: Resource) => {
          return {
            title: resource.name,
            description: resource.description || '',
          };
        });
      })
    );
  }
}
