/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleModelServiceService } from './vehicle-model-service.service';

describe('Service: VehicleModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleModelServiceService]
    });
  });

  it('should ...', inject([VehicleModelServiceService], (service: VehicleModelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
