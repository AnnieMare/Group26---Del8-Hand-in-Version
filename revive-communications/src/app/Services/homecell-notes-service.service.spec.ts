import { TestBed } from '@angular/core/testing';

import { HomecellNotesServiceService } from './homecell-notes-service.service';

describe('HomecellNotesServiceService', () => {
  let service: HomecellNotesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomecellNotesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
