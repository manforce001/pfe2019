/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModifierService } from './modifier.service';

describe('Service: Modifier', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifierService]
    });
  });

  it('should ...', inject([ModifierService], (service: ModifierService) => {
    expect(service).toBeTruthy();
  }));
});
