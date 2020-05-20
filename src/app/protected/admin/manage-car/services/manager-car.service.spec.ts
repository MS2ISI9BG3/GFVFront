import { TestBed } from '@angular/core/testing';

import { ManagerCarService } from './manager-car.service';

describe('ManagerCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerCarService = TestBed.get(ManagerCarService);
    expect(service).toBeTruthy();
  });
});
