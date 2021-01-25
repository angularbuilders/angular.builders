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
import { CategoriesService } from '../../../core/services/categories.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Card[]> {
  constructor(private categories: CategoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Card[]> {
    return this.categories
      .getAll$()
      .pipe(map(this.categories.transformToCards));
  }
}
