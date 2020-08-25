import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';

import { DocumentService } from './document/document.service';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ DocumentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
