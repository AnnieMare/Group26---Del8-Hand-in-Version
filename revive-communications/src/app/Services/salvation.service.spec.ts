import { TestBed } from '@angular/core/testing';

import { SalvationService } from './salvation.service';

describe('SalvationService', () => {
  let service: SalvationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
