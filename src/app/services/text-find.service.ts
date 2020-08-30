import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IUpdateText } from '../interfaces/update-text';

@Injectable({
  providedIn: 'root'
})
export class TextFindService {

  resultIndexes = [];
  resultIndex = [];
  resultsCount: number;
  matchedIds = [];
  replaceText$ = new Subject<IUpdateText[]>();
  findString$ = new Subject<string>();
  resultIndexes$ = new Subject<any[]>();
  resultCountUpdated$ = new Subject<number>();
  formReset$ = new Subject<boolean>();
  selectMatchInstance$ = new Subject<number>();

  constructor() {
  }
}
