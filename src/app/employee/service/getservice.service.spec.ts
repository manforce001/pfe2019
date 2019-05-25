/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetserviceService } from './getservice.service';

describe('Service: Getservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetserviceService]
    });
  });

  it('should ...', inject([GetserviceService], (service: GetserviceService) => {
    expect(service).toBeTruthy();
  }));
});
