import { TestBed } from '@angular/core/testing';

import { RestBrandService } from './rest-brand.service';

describe('RestBrandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestBrandService = TestBed.get(RestBrandService);
    expect(service).toBeTruthy();
  });
});
