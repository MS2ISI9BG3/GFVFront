import {TestBed} from '@angular/core/testing';

import {RestRideService} from './rest-ride.service';

describe('RestRideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestRideService = TestBed.get(RestRideService);
    expect(service).toBeTruthy();
  });
});
