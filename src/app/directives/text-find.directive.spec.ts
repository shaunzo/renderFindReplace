// import { TextFindDirective } from './text-find.directive';
// import { ElementRef } from '@angular/core';
// import { MockElementRef, TextFindServiceMock } from './Mocks';
// import { TestBed, fakeAsync, tick, async, inject } from '@angular/core/testing';
// import { Renderer2 } from '@angular/core';
// import { TextFindService } from '../services/text-find.service';
// import { DocumentComponent } from '../document/document.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of, Observable } from 'rxjs';
// import { spyOnClass } from 'jasmine-es6-spies';

// describe('TextFindDirective', () => {
//   let directive;
//   let fixture;


//   beforeEach(async(() => {
//     fixture = TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       declarations: [ DocumentComponent ],
//       providers: [
//         TextFindDirective,
//         Renderer2,
//         {provide: ElementRef, useValue: MockElementRef },
//         {provide: TextFindService, useValue: TextFindServiceMock}
//        ]
//     }).createComponent(DocumentComponent);

//     fixture.detectChanges();

//   }));

//   beforeEach(() => {
//     // directive = new TextFindDirective( null, null, null)
//     directive = TestBed.inject(TextFindDirective);
//     // textFindService = TestBed.inject(TextFindService);
//   });

//   beforeEach(() => {

//   });

//   it('should create an instance', () => {
//     expect(directive).toBeTruthy();
//   });

//   // describe('makeSelection() method', () => {
//   //   it('should wrap a matching string with a "<span class="highlightText">" tag', () => {
//   //     // textFindService.findString$ = () => of();
//   //     const spy = spyOn(textFindService, 'next()');

//   //     const content = 'The boy jumped over the wall';
//   //     const matchString = 'jump';
//   //     //directive.subscriptionFindString.and.returnValue(of(matchString));
//   //     const result = directive.makeSelection(matchString);

//   //     inject([ElementRef, TextFindService, Renderer2 ], (elementRef: ElementRef, textFindService: TextFindService, renderer: Renderer2) => {
//   //       expect(result).toEqual('The boy <span class="highlightText">jum</span>ped over the wall');
//   //     });
//   //   });
//   // });

//   it('should have a makeSelection() which will wrap a matching string with a "<span class="highlightText">" tag', () => {
//     const content = 'The boy jumped over the wall';
//     const matchString = 'jump';
//     spyOn(TextFindServiceMock, 'findString').and.returnValue({ subscribe: () => {}});
//   });


// });
