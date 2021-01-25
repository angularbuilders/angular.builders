import { TestBed } from '@angular/core/testing';
import { ItemsResolver } from './items.resolver';

describe('ItemsResolver', () => {
  let resolver: ItemsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ItemsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
