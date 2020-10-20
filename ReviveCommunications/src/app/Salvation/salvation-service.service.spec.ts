import { TestBed } from '@angular/core/testing';

import { SalvationServiceService } from './salvation-service.service';

describe('SalvationServiceService', () => {
  let service: SalvationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
