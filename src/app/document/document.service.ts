import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IDocument } from '../interfaces/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentUpdated$ = new Subject<IDocument>();

  constructor(private httpClient: HttpClient) {}

  getDocument$() {
    return this.httpClient.get('assets/data/public/Q1-sample-text.json');
  }
}
