import { TestBed } from '@angular/core/testing';

import { GrouptypeService } from './grouptype.service';

describe('GrouptypeService', () => {
  let service: GrouptypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrouptypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
