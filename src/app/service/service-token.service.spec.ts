import { TestBed } from '@angular/core/testing';

import { ServiceTokenService } from './service-token.service';

describe('ServiceTokenService', () => {
  let service: ServiceTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
