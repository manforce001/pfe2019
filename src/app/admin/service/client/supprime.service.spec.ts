/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupprimeService } from './supprime.service';

describe('Service: Supprime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupprimeService]
    });
  });

  it('should ...', inject([SupprimeService], (service: SupprimeService) => {
    expect(service).toBeTruthy();
  }));
});
