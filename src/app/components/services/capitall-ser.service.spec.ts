import { TestBed } from '@angular/core/testing';

import { CapitallSerService } from './capitall-ser.service';

describe('CapitallSerService', () => {
  let service: CapitallSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitallSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
