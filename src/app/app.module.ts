import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';

import { DocumentService } from './document/document.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ DocumentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
