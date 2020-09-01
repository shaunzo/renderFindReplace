// import { TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { HttpClient } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
// import { DocumentService } from './document.service';

// describe('DocumentService', () => {
//   let documentService: DocumentService;
//   let httpClient: HttpClient;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     });
//     documentService = TestBed.inject(DocumentService);
//   });

//   beforeEach(() => {
//     documentService = TestBed.get(DocumentService);
//     httpClient = TestBed.get(HttpClient);
//   });

//   it('should be created', () => {
//     expect(documentService).toBeTruthy();
//   });

//   it('should make a call to an endpoint and receive a list of documents', fakeAsync(() => {
//     const spy = jasmine.createSpy('spy');
//     const documents = require('../../assets/data/Q1-sample-text.json');
//     spyOn(httpClient, 'get').and.returnValue(of(documents));
//     documentService.getDocument$().subscribe(spy);

//     tick();

//     expect(httpClient.get).toHaveBeenCalledWith('assets/data/Q1-sample-text.json');
//     expect(spy).toHaveBeenCalledWith(documents);
//   }));
// });
