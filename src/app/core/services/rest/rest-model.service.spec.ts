import { TestBed } from '@angular/core/testing';

import { RestModelService } from './rest-model.service';

describe('RestModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestModelService = TestBed.get(RestModelService);
    expect(service).toBeTruthy();
  });
});
