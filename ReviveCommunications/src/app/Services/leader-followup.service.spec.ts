import { TestBed } from '@angular/core/testing';

import { LeaderFollowupService } from './leader-followup.service';

describe('LeaderFollowupService', () => {
  let service: LeaderFollowupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderFollowupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
