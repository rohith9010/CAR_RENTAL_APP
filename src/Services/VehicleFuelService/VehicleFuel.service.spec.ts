/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleFuelService } from './VehicleFuel.service';

describe('Service: VehicleFuel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleFuelService]
    });
  });

  it('should ...', inject([VehicleFuelService], (service: VehicleFuelService) => {
    expect(service).toBeTruthy();
  }));
});
