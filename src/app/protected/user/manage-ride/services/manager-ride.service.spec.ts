import {TestBed} from '@angular/core/testing';

import {ManagerRideService} from './manager-ride.service';

describe('ManagerCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerRideService = TestBed.get(ManagerRideService);
    expect(service).toBeTruthy();
  });
});
