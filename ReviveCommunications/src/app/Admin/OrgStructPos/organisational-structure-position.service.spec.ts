import { TestBed } from '@angular/core/testing';

import { OrganisationalStructurePositionService } from './organisational-structure-position.service';

describe('OrganisationalStructurePositionService', () => {
  let service: OrganisationalStructurePositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationalStructurePositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
