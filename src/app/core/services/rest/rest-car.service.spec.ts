import { TestBed } from '@angular/core/testing';

import { RestCarService } from './rest-car.service';

describe('RestCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestCarService = TestBed.get(RestCarService);
    expect(service).toBeTruthy();
  });
});
