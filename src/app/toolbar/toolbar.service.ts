import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  findString$ = new Subject<string>();

  constructor() { }
}
