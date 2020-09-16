import {TestBed} from '@angular/core/testing';

import {MapperRideService} from './mapper-ride.service';

describe('MapperRideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperRideService = TestBed.get(MapperRideService);
    expect(service).toBeTruthy();
  });
});
