import { FunctionalStoreService } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

interface CategoriesStore {
  categories: Category[];
  loaded: boolean;
  filled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreService extends FunctionalStoreService<CategoriesStore> {
  constructor() {
    super({ categories: [], loaded: false, filled: false });
  }
  saveCategories(categories: Category[]) {
    const storeCategoriesAction = (state: CategoriesStore) => {
      state.categories = categories;
      state.loaded = true;
      return state;
    };
    this.dispatch(storeCategoriesAction);
  }

  saveFilled(filled: boolean) {
    const storeFilledAction = (state: CategoriesStore) => {
      state.filled = filled;
      return state;
    };
    this.dispatch(storeFilledAction);
  }
  selectLoaded$() {
    const selection = (state: CategoriesStore) => state.loaded;
    return this.select$(selection);
  }

  selectFilled$() {
    const selection = (state: CategoriesStore) => state.filled;
    return this.select$(selection);
  }
}
