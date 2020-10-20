import { TestBed } from '@angular/core/testing';

import { NmoService } from './nmo.service';

describe('NmoService', () => {
  let service: NmoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
