import { TestBed } from '@angular/core/testing';

import { ReportOnChurchAttService } from './report-on-church-att.service';

describe('ReportOnChurchAttService', () => {
  let service: ReportOnChurchAttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportOnChurchAttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
