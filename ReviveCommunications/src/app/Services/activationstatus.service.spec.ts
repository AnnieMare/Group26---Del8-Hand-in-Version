import { TestBed } from '@angular/core/testing';

import { ActivationstatusService } from './activationstatus.service';

describe('ActivationstatusService', () => {
  let service: ActivationstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivationstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
