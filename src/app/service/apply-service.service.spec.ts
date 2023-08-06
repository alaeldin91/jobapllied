import { TestBed } from '@angular/core/testing';

import { ApplyServiceService } from './apply-service.service';

describe('ApplyServiceService', () => {
  let service: ApplyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
