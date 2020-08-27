import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';

import { DocumentService } from './document/document.service';
import { ToolbarService } from './toolbar/toolbar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TextHighlightDirective } from './document/textFind.directive';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ToolbarComponent,
    TextHighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DocumentService,
    ToolbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
