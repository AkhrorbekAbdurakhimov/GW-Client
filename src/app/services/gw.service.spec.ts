import { TestBed } from '@angular/core/testing';

import { GwService } from './gw.service';

describe('GwService', () => {
  let service: GwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
