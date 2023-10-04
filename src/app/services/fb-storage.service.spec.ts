import { TestBed } from '@angular/core/testing';

import { FbStorageService } from './fb-storage.service';

describe('FbStorageService', () => {
  let service: FbStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
