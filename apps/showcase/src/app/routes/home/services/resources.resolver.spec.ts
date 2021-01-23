import { TestBed } from '@angular/core/testing';

import { ResourcesResolver } from './resources.resolver';

describe('ResourcesResolver', () => {
  let resolver: ResourcesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResourcesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
