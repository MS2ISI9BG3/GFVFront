import { TestBed } from '@angular/core/testing';

import { MapperBrandService } from './mapper-brand.service';

describe('MapperBrandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperBrandService = TestBed.get(MapperBrandService);
    expect(service).toBeTruthy();
  });
});
