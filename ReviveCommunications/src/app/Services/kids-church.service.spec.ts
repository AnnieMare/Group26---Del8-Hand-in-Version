import { TestBed } from '@angular/core/testing';

import { KidsChurchService } from './kids-church.service';

describe('KidsChurchService', () => {
  let service: KidsChurchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KidsChurchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
