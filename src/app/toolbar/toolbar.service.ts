import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  calculatingResults = false;

  constructor( private textFindService: TextFindService) {
    this.subscriptionCountUpdated = this.textFindService.resultCountUpdated$.pipe(debounceTime(1000)).subscribe(
      count => {

        if (count) {
          this.calculatingResults = false;
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

  replaceSelectedText(find: string, replace: string, formGroup: FormGroup) {
    const arr: IUpdateText[] = [];

    const updateItem: IUpdateText = {
      pIndex: this.textFindService.resultIndex[0],
      spanIndex: this.textFindService.resultIndex[1],
      contentIndex: this.textFindService.resultIndex[2],
      textMatch: find,
      textReplace: replace
    };

    arr.push(updateItem);

    this.textFindService.replaceText$.next(arr);
    formGroup.reset();
    this.textFindService.formReset$.next(true);
  }

  selectMatchInstance(index: number) {
    this.textFindService.selectMatchInstance$.next(index);
  }

  ngOnDestroy() {
    this.subscriptionCountUpdated.unsubscribe();
  }
}
