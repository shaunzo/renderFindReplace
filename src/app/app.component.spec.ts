import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TextFindDirective } from './directives/text-find.directive';
import { LoaderComponent } from './loader/loader.component';
import { ErrorComponent } from './error/error.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        DocumentComponent,
        ToolbarComponent,
        TextFindDirective,
        LoaderComponent,
        ErrorComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain the document component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const documentComponent = fixture.nativeElement.querySelector('[data-test="documentComponent"]');
    expect(documentComponent).toBeTruthy();
  });

  it('should contain the toolbar component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const toolbarComponent = fixture.nativeElement.querySelector('[data-test="toolbarComponent"]');
    expect(toolbarComponent).toBeTruthy();
  });
});
