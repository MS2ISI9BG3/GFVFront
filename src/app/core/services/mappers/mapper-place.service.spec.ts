import { TestBed } from '@angular/core/testing';

import { MapperPlaceService } from './mapper-place.service';

describe('MapperPlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperPlaceService = TestBed.get(MapperPlaceService);
    expect(service).toBeTruthy();
  });
});
