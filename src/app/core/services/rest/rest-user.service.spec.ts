import { TestBed } from '@angular/core/testing';

import { RestUserService } from './rest-user.service';

describe('RestUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestUserService = TestBed.get(RestUserService);
    expect(service).toBeTruthy();
  });
});
