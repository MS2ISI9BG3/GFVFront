import { TestBed } from '@angular/core/testing';

import { MapperUserService } from './mapper-user.service';

describe('MapperUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperUserService = TestBed.get(MapperUserService);
    expect(service).toBeTruthy();
  });
});
