import { TestBed } from '@angular/core/testing';

import { ReportZoneGrowthService } from './report-zone-growth.service';

describe('ReportZoneGrowthService', () => {
  let service: ReportZoneGrowthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportZoneGrowthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
