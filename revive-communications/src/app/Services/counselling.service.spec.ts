import { TestBed } from '@angular/core/testing';

import { CounsellingService } from './counselling.service';

describe('CounsellingService', () => {
  let service: CounsellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounsellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
