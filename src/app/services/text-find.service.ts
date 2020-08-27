import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextFindService {

  findString = new Subject<string>();
  resultsCount: number;

  constructor() { }
}
