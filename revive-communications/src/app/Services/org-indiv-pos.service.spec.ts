import { TestBed } from '@angular/core/testing';

import { OrgIndivPosService } from './org-indiv-pos.service';

describe('OrgIndivPosService', () => {
  let service: OrgIndivPosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgIndivPosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
