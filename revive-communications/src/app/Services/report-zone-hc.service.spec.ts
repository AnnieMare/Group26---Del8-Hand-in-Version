import { TestBed } from '@angular/core/testing';

import { ReportZoneHcService } from './report-zone-hc.service';

describe('ReportZoneHcService', () => {
  let service: ReportZoneHcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportZoneHcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
