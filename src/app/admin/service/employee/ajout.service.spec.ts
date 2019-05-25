/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AjoutService } from './ajout.service';

describe('Service: Ajout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjoutService]
    });
  });

  it('should ...', inject([AjoutService], (service: AjoutService) => {
    expect(service).toBeTruthy();
  }));
});
