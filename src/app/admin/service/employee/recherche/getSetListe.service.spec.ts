/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetSetListeService } from './getSetListe.service';

describe('Service: GetSetListe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSetListeService]
    });
  });

  it('should ...', inject([GetSetListeService], (service: GetSetListeService) => {
    expect(service).toBeTruthy();
  }));
});
