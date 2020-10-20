import { TestBed } from '@angular/core/testing';

import { ReportStructureGrowthService } from './report-structure-growth.service';

describe('ReportStructureGrowthService', () => {
  let service: ReportStructureGrowthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportStructureGrowthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
