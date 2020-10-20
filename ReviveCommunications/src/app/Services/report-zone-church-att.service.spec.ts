import { TestBed } from '@angular/core/testing';

import { ReportZoneChurchAttService } from './report-zone-church-att.service';

describe('ReportZoneChurchAttService', () => {
  let service: ReportZoneChurchAttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportZoneChurchAttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
