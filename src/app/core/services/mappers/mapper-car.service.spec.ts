import { TestBed } from '@angular/core/testing';

import { MapperCarService } from './mapper-car.service';

describe('MapperCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperCarService = TestBed.get(MapperCarService);
    expect(service).toBeTruthy();
  });
});
