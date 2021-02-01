import { TestBed } from '@angular/core/testing';

import { CategoriesStoreService } from './categories-store.service';

describe('CategoriesStoreService', () => {
  let service: CategoriesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
