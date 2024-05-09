/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CitiesService } from './Cities.service';

describe('Service: Cities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitiesService]
    });
  });

  it('should ...', inject([CitiesService], (service: CitiesService) => {
    expect(service).toBeTruthy();
  }));
});
