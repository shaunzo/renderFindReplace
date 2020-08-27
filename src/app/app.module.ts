import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { DocumentService } from './document/document.service';
import { ToolbarService } from './toolbar/toolbar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TextFindDirective } from './directives/text-find.directive';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ToolbarComponent,
    TextFindDirective
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
  bootstrap: [AppComponent],
  exports: [TextFindDirective]
})
export class AppModule { }
