/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AfficheUnService } from './afficheUn.service';

describe('Service: AfficheUn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfficheUnService]
    });
  });

  it('should ...', inject([AfficheUnService], (service: AfficheUnService) => {
    expect(service).toBeTruthy();
  }));
});
