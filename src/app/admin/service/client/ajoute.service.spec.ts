/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AjouteService } from './ajoute.service';

describe('Service: Ajoute', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjouteService]
    });
  });

  it('should ...', inject([AjouteService], (service: AjouteService) => {
    expect(service).toBeTruthy();
  }));
});
