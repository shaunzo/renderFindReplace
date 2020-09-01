import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DocumentComponent } from './document.component';

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ DocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Should envoke getDocument$ method on document serve when getDocument is triggered

  // Should display an error if we dont get the required data

  // Should display an error if the data return does not conform to the correct schema

  //  Will display a loader while fetching data

  // Should display 404 error code if required JSON file is not found

  // When it receive a message to find a string it will wrap all matches in a span with a .highlightText class

  // When it receive a message to find a string it will send the amount of matches found
});
