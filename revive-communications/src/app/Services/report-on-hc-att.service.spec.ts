import { TestBed } from '@angular/core/testing';

import { ReportOnHcAttService } from './report-on-hc-att.service';

describe('ReportOnHcAttService', () => {
  let service: ReportOnHcAttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportOnHcAttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
