import { TestBed } from '@angular/core/testing';

import { NMOService } from './nmo.service';

describe('NMOService', () => {
  let service: NMOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NMOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
