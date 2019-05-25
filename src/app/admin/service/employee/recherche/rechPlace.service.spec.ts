/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RechPlaceService } from './rechPlace.service';

describe('Service: RechPlace', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RechPlaceService]
    });
  });

  it('should ...', inject([RechPlaceService], (service: RechPlaceService) => {
    expect(service).toBeTruthy();
  }));
});
