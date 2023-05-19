import { TestBed } from '@angular/core/testing';

import { MyGwService } from './my-gw.service';

describe('MyGwService', () => {
  let service: MyGwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
