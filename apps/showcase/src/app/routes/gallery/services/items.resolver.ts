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
import { ItemsService } from '../../../core/services/items.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsResolver implements Resolve<Card[]> {
  constructor(private resources: ItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Card[]> {
    return this.resources
      .getFeatured$()
      .pipe(map(this.resources.transformToCards));
  }
}
