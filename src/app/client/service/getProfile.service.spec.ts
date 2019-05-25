/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetProfileService } from './getProfile.service';

describe('Service: GetProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProfileService]
    });
  });

  it('should ...', inject([GetProfileService], (service: GetProfileService) => {
    expect(service).toBeTruthy();
  }));
});
