import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DocumentService } from './document.service';

fdescribe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
