import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TextFindService } from './text-find.service';

describe('TextFindService', () => {
  let service: TextFindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(TextFindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain a resulIndexes array property', () => {
    expect(service.resultIndexes).toBeTruthy();
    expect(service.resultIndexes.length).toBe(0);
  });

  it('should contain a resultIndex array property', () => {
    expect(service.resultIndex).toBeTruthy();
    expect(service.resultIndex.length).toBe(0);
  });

  it('should contain a resultsCount property to be declared but undefined', () => {
    expect(service.resultsCount).toBeUndefined();
  });

  it('should contain a matchedIds array property', () => {
    expect(service.matchedIds).toBeTruthy();
    expect(service.matchedIds.length).toBe(0);
  });

  it('should contain a replaceText$ RXJS Subject', () => {
    expect(service.replaceText$).toBeTruthy();
  });

  it('should contain a findString$ RXJS Subject', () => {
    expect(service.findString$).toBeTruthy();
  });

  it('should contain a resultIndexes$ RXJS Subject', () => {
    expect(service.resultIndexes$).toBeTruthy();
  });

  it('should contain a resultCountUpdated$ RXJS Subject', () => {
    expect(service.resultCountUpdated$).toBeTruthy();
  });

  it('should contain a formReset$ RXJS Subject', () => {
    expect(service.formReset$).toBeTruthy();
  });

  it('should contain a selectMatchInstance$ RXJS Subject', () => {
    expect(service.selectMatchInstance$).toBeTruthy();
  });
});

