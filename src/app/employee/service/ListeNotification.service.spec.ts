/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListeNotificationService } from './ListeNotification.service';

describe('Service: ListeNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListeNotificationService]
    });
  });

  it('should ...', inject([ListeNotificationService], (service: ListeNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
