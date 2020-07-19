import { TestBed } from '@angular/core/testing';

import { MapperModelService } from './mapper-model.service';

describe('MapperModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperModelService = TestBed.get(MapperModelService);
    expect(service).toBeTruthy();
  });
});
