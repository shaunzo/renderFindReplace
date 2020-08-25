import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) {}

  getDocument$() {
    return this.httpClient.get('assets/data/Q1-sample-text.json');
  }
}
