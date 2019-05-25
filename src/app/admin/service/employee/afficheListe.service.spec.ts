/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AfficheListeService } from './afficheListe.service';

describe('Service: AfficheListe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfficheListeService]
    });
  });

  it('should ...', inject([AfficheListeService], (service: AfficheListeService) => {
    expect(service).toBeTruthy();
  }));
});
