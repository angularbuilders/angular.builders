import { FunctionalStoreService } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import { Item } from '../../../core/models/Item';
import { SearchParams } from '../../../core/models/SearchParams';
import { Search } from '../models/Search';
@Injectable({
  providedIn: 'root',
})
export class SearchStoreService extends FunctionalStoreService<Search> {
  constructor() {
    super({
      params: {
        term: '',
        sortBy: 'name',
      },
      results: {
        data: [],
      },
      status: {
        type: '',
        message: '',
      },
    });
  }

  storeQueryParams(queryParams: unknown) {
    const storeParamsAction = (state: Search) => {
      state.params = queryParams as SearchParams;
      return state;
    };
    this.dispatch(storeParamsAction);
  }
  storeTerm(term: string) {
    const storeTermAction = (state: Search) => {
      state.params.term = term;
      return state;
    };
    this.dispatch(storeTermAction);
  }
  selectParams$() {
    const selection = (state: Search) => state.params;
    return this.select$(selection);
  }
  storeItems(items: Item[]) {
    const storeResultsAction = (state: Search) => {
      state.results.data = items;
      state.status.type = 'idle';
      state.status.message = `${items.length} found`;
      return state;
    };
    this.dispatch(storeResultsAction);
  }
  storeError(error: Error) {
    const storeQueryParamsAction = (state: Search) => {
      state.results.data = [];
      state.status.type = 'error';
      state.status.message = error.message;
      return state;
    };
    this.dispatch(storeQueryParamsAction);
  }
  selectResults$() {
    const selection = (state: Search) => state.results;
    return this.select$(selection);
  }
  selectStatus$() {
    const selection = (state: Search) => state.status;
    return this.select$(selection);
  }
}
