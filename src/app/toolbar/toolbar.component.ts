import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToolbarService } from './toolbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  subscriptionMatchesCount = new Subscription();
  findReplaceForm: FormGroup;
  matchesFound: number;
  findString: string;
  selectionIncrement = 1;

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {

    this.subscriptionMatchesCount = this.toolbarService.matchesCountUpdated$.subscribe(count => {
      this.matchesFound = count;
      this.selectionIncrement = 1;
    });

    this.findReplaceForm = new FormGroup({
      find : new FormControl(null),
      replace: new FormControl(null)
    });

    this.matchesFound = this.toolbarService.matchesFound;
  }

  findText(text: string) {
    this.toolbarService.findText(text);
  }

  selectMatchNext() {
    if (this.selectionIncrement < this.matchesFound) {
      this.selectionIncrement++;
      this.toolbarService.selectMatchInstance(this.selectionIncrement - 1);
    } else {
      return;
    }
  }

  selectMatchPrev() {
    let index = null;
    if (this.selectionIncrement > 1) {
      this.selectionIncrement--;
      this.selectionIncrement === 0 ? index = this.selectionIncrement : index = this.selectionIncrement - 1;
      this.toolbarService.selectMatchInstance(index);
    } else {
      return;
    }
  }

  replaceAllText(find: string, replace: string, formGroup: FormGroup) {
   this.toolbarService.replaceAllText(find, replace, formGroup);
  }

  ngOnDestroy() {
    this.subscriptionMatchesCount.unsubscribe();
  }

}
