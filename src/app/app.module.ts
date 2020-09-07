import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { DocumentService } from './document/document.service';
import { ToolbarService } from './toolbar/toolbar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ToolbarComponent,
    LoaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    DocumentService,
    ToolbarService
  ],
  bootstrap: [AppComponent],
  exports: [
    FontAwesomeModule
  ]
})
export class AppModule { }
