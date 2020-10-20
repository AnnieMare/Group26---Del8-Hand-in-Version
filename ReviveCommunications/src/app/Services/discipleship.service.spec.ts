import { TestBed } from '@angular/core/testing';

import { DiscipleshipService } from './discipleship.service';

describe('DiscipleshipService', () => {
  let service: DiscipleshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscipleshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
