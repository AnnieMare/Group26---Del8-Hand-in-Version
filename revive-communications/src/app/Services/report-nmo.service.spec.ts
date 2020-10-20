import { TestBed } from '@angular/core/testing';

import { ReportNMOService } from './report-nmo.service';

describe('ReportNMOService', () => {
  let service: ReportNMOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportNMOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
