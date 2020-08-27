import { TestBed } from '@angular/core/testing';

import { TextFindService } from './text-find.service';

describe('TextFindService', () => {
  let service: TextFindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextFindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
