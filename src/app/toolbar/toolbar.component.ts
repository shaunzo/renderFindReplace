import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TextFindService } from '../services/text-find.service';
import { Subscription } from 'rxjs';
import { IUpdateText } from '../interfaces/update-text';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  subscriptionCountUpdated = new Subscription();

  findReplaceForm: FormGroup;
  matchesFound: number;
  findString: string;

  constructor(private textFindService: TextFindService) { }

  ngOnInit(): void {
    this.findReplaceForm = new FormGroup({
      find : new FormControl(null),
      replace: new FormControl(null)
    });

    this.subscriptionCountUpdated = this.textFindService.resultCountUpdated$.subscribe(count => this.matchesFound = count );
  }

  findText() {
    this.textFindService.findString$.next(this.findReplaceForm.value.find);
    this.matchesFound = this.textFindService.resultsCount;
  }

  replaceText() {
    const arr: IUpdateText[] = [];

    if (this.textFindService.resultIndexes.length > 0) {
      this.textFindService.resultIndexes.forEach(item => {

        const updateItem: IUpdateText = {
           pIndex: item[0],
           spanIndex: item[1],
           contentIndex: item[2],
           textMatch: this.findReplaceForm.value.find,
           textReplace: this.findReplaceForm.value.replace
         };

        arr.push(updateItem);
      });
    }

    this.textFindService.replaceText$.next(arr);
    this.findReplaceForm.reset();
    this.textFindService.formReset$.next(true);
  }

  ngOnDestroy() {
    this.subscriptionCountUpdated.unsubscribe();
  }

}
