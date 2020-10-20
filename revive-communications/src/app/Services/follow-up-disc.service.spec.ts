import { TestBed } from '@angular/core/testing';

import { FollowUpDiscService } from './follow-up-disc.service';

describe('FollowUpDiscService', () => {
  let service: FollowUpDiscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowUpDiscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
