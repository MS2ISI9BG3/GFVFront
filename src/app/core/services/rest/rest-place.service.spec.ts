import { TestBed } from '@angular/core/testing';

import { RestPlaceService } from './rest-place.service';

describe('RestPlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestPlaceService = TestBed.get(RestPlaceService);
    expect(service).toBeTruthy();
  });
});
