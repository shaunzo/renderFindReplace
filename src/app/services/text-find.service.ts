import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextFindService {

  findString$ = new Subject<string>();
  resultsCount: number;
  resultIndexes$ = new Subject<any[]>();
  resultCountUpdated$ = new Subject<number>();
  formReset$ = new Subject<boolean>();

  constructor() { }
}
