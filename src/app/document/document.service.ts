import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as documentData from '../../data/Q1-sample-text.json';


const localUrl = 'server/public_html/documents/Q1-sample-text.json';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor( private http: HttpClient) { }

  getDocument$() {
    return of(documentData);
  }
}
