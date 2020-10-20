import { TestBed } from '@angular/core/testing';

import { MembersWantingToServeFollowUpService } from './members-wanting-to-serve-follow-up.service';

describe('MembersWantingToServeFollowUpService', () => {
  let service: MembersWantingToServeFollowUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersWantingToServeFollowUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
