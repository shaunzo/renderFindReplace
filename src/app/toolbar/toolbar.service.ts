import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { TextFindService } from '../services/text-find.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService implements OnDestroy {

  subscriptionCountUpdated = new Subscription();

  findString$ = new Subject<string>();

  constructor() { }

  ngOnDestroy() {

  }
}
