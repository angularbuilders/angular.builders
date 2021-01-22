/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoriesService, Category } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private categories: CategoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {
    return this.categories.getAll$();
  }
}
