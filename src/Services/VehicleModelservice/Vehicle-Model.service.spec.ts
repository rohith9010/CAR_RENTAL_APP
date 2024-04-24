/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleModelService } from './Vehicle-Model.service';

describe('Service: VehicleModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleModelService]
    });
  });

  it('should ...', inject([VehicleModelService], (service: VehicleModelService) => {
    expect(service).toBeTruthy();
  }));
});
