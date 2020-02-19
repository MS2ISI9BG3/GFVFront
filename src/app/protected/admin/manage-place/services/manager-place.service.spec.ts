import { TestBed } from '@angular/core/testing';

import { ManagerPlaceService } from './manager-place.service';

describe('ManagerPlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerPlaceService = TestBed.get(ManagerPlaceService);
    expect(service).toBeTruthy();
  });
});
