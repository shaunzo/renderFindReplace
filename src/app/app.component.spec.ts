import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
        DocumentComponent,
        ToolbarComponent
      ],
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
