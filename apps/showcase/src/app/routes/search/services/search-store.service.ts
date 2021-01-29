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
    const searchParams = queryParams as SearchParams;
    const storeParamsAction = (state: Search) => {
      return {
        params: {
          term: searchParams.term ?? '',
          sortBy: searchParams.sortBy ?? state.params.sortBy,
        },
        results: { data: [] },
        status: {
          type: 'searching',
          message: `searching`,
        },
      };
    };
    this.dispatch(storeParamsAction);
  }
  storeTerm(term: string) {
    const storeTermAction = (state: Search) => {
      return {
        params: {
          ...state.params,
          term: term,
        },
        results: { data: [] },
        status: {
          type: 'searching',
          message: `searching`,
        },
      };
    };
    this.dispatch(storeTermAction);
  }
  selectParams$() {
    const selection = (state: Search) => state.params;
    return this.select$(selection);
  }
  storeItems(items: Item[]) {
    const storeResultsAction = (state: Search) => {
      return {
        ...state,
        results: { data: items },
        status: {
          type: 'idle',
          message: `${items.length} found`,
        },
      };
    };
    this.dispatch(storeResultsAction);
  }
  storeError(error: Error) {
    console.error(error.message);
    const storeQueryParamsAction = (state: Search) => {
      return {
        ...state,
        results: { data: [] },
        status: {
          type: 'error',
          message: error.message,
        },
      };
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
