/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleCapacityService } from './VehicleCapacity.service';

describe('Service: VehicleCapacity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleCapacityService]
    });
  });

  it('should ...', inject([VehicleCapacityService], (service: VehicleCapacityService) => {
    expect(service).toBeTruthy();
  }));
});
