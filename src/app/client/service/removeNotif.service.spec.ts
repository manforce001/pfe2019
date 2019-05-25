/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoveNotifService } from './removeNotif.service';

describe('Service: RemoveNotif', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveNotifService]
    });
  });

  it('should ...', inject([RemoveNotifService], (service: RemoveNotifService) => {
    expect(service).toBeTruthy();
  }));
});
