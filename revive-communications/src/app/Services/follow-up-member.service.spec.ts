import { TestBed } from '@angular/core/testing';

import { FollowUpMemberService } from './follow-up-member.service';

describe('FollowUpMemberService', () => {
  let service: FollowUpMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowUpMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
