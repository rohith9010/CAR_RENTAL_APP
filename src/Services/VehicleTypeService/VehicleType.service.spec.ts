/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleTypeService } from './VehicleType.service';

describe('Service: VehicleType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleTypeService]
    });
  });

  it('should ...', inject([VehicleTypeService], (service: VehicleTypeService) => {
    expect(service).toBeTruthy();
  }));
});
