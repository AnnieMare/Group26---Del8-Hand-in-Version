import { TestBed } from '@angular/core/testing';

import { OrganisationalStruturePositionService } from './organisational-struture-position.service';

describe('OrganisationalStruturePositionService', () => {
  let service: OrganisationalStruturePositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationalStruturePositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
