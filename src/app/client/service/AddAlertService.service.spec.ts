/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddAlertServiceService } from './AddAlertService.service';

describe('Service: AddAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAlertServiceService]
    });
  });

  it('should ...', inject([AddAlertServiceService], (service: AddAlertServiceService) => {
    expect(service).toBeTruthy();
  }));
});
