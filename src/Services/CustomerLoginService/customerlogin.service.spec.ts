/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerloginService } from './customerlogin.service';

describe('Service: Customerlogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerloginService]
    });
  });

  it('should ...', inject([CustomerloginService], (service: CustomerloginService) => {
    expect(service).toBeTruthy();
  }));
});
