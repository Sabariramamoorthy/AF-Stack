import { TestBed } from '@angular/core/testing';

import { FbMessingService } from './fb-messing.service';

describe('FbMessingService', () => {
  let service: FbMessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbMessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
