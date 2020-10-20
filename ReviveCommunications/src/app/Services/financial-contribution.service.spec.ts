import { TestBed } from '@angular/core/testing';

import { FinancialContributionService } from './financial-contribution.service';

describe('FinancialContributionService', () => {
  let service: FinancialContributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialContributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
