import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { TextFindService } from '../services/text-find.service';
import { IUpdateText } from '../interfaces/update-text';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService implements OnDestroy {

  subscriptionCountUpdated = new Subscription();
  matchesFound: number;
  matchesCountUpdated$ = new Subject<number>();
  findString$ = new Subject<string>();
  currentSelectionAll = this.textFindService.matchedIds;

  constructor( private textFindService: TextFindService) {
    this.subscriptionCountUpdated = this.textFindService.resultCountUpdated$.subscribe(
      count => {

        if (count) {
          this.matchesFound = count;
          this.matchesCountUpdated$.next(count);
        } else {
          this.matchesCountUpdated$.next(0);
        }
      });
  }

  findText(text: string) {
    this.textFindService.findString$.next(text);
    this.matchesFound = this.textFindService.resultsCount;
  }

  replaceAllText(find: string, replace: string, formGroup: FormGroup) {
    const arr: IUpdateText[] = [];

    if (this.textFindService.resultIndexes.length > 0) {
      this.textFindService.resultIndexes.forEach(item => {

        const updateItem: IUpdateText = {
           pIndex: item[0],
           spanIndex: item[1],
           contentIndex: item[2],
           textMatch: find,
           textReplace: replace
         };

        arr.push(updateItem);
      });
    }

    this.textFindService.replaceText$.next(arr);
    formGroup.reset();
    this.textFindService.formReset$.next(true);
  }

  ngOnDestroy() {
    this.subscriptionCountUpdated.unsubscribe();
  }
}
