/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnvoyeNotificationService } from './EnvoyeNotification.service';

describe('Service: EnvoyeNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvoyeNotificationService]
    });
  });

  it('should ...', inject([EnvoyeNotificationService], (service: EnvoyeNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
