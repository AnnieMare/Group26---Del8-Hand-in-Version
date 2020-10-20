import { TestBed } from '@angular/core/testing';

import { MemberServeFollowUpService } from './member-serve-follow-up.service';

describe('MemberServeFollowUpService', () => {
  let service: MemberServeFollowUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberServeFollowUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
