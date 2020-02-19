import { TestBed } from '@angular/core/testing';

import { FakeRestUserService } from './fake-rest-user.service';

describe('FakeRestUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeRestUserService = TestBed.get(FakeRestUserService);
    expect(service).toBeTruthy();
  });
});
