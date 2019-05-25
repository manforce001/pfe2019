/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModifProfileService } from './ModifProfile.service';

describe('Service: ModifProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifProfileService]
    });
  });

  it('should ...', inject([ModifProfileService], (service: ModifProfileService) => {
    expect(service).toBeTruthy();
  }));
});
