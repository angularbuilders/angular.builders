/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card } from '@angular.builders/ui';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourcesService } from '../../../core/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class ResourcesResolver implements Resolve<Card[]> {
  constructor(private resources: ResourcesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Card[]> {
    return this.resources
      .getFeatured$()
      .pipe(map(this.resources.transformToCards));
  }
}
