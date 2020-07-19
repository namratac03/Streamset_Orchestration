import { TestBed } from '@angular/core/testing';

import { StreamsetService } from './streamset.service';

describe('StreamsetService', () => {
  let service: StreamsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
