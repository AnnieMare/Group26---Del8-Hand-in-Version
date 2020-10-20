import { TestBed } from '@angular/core/testing';

import { ReportDiscService } from './report-disc.service';

describe('ReportDiscService', () => {
  let service: ReportDiscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDiscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
