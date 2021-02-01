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
  saveSearchParams(searchParams: SearchParams) {
    const storeParamsAction = (state: Search) => {
      state.params = searchParams;
      state.results = { ...state.results, data: [] };
      state.status = {
        ...state.status,
        type: 'cleaning',
        message: `Params changed`,
      };
      return state;
    };
    this.dispatch(storeParamsAction);
  }
  saveSearchingStaus() {
    const storeParamsAction = (state: Search) => {
      state.results = { ...state.results, data: [] };
      state.status = {
        ...state.status,
        type: 'searching',
        message: `Searching, please wait...`,
      };
      return state;
    };
    this.dispatch(storeParamsAction);
  }
  saveItems(items: Item[]) {
    const storeResultsAction = (state: Search) => {
      state.results = { ...state.results, data: items };
      state.status = {
        ...state.status,
        type: 'idle',
        message: `${items.length} found`,
      };
      return state;
    };
    this.dispatch(storeResultsAction);
  }
  saveError(error: Error) {
    const storeQueryParamsAction = (state: Search) => {
      state.results = { ...state.results, data: [] };
      state.status = {
        ...state.status,
        type: 'error',
        message: error.message,
      };
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
