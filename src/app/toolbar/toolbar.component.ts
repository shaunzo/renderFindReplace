import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToolbarService } from './toolbar.service';
import { Subscription } from 'rxjs';
import { faSearch, faAngleRight, faAngleLeft, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faFileWord = faFileWord;

  subscriptionMatchesCount = new Subscription();
  findReplaceForm: FormGroup;
  matchesFound: number;
  findString: string;
  selectionIncrement = 1;
  calculatingResults: boolean;

  constructor(private toolbarService: ToolbarService) {
    this.calculatingResults = this.toolbarService.calculatingResults;
  }

  ngOnInit(): void {

    this.subscriptionMatchesCount = this.toolbarService.matchesCountUpdated$.subscribe(count => {
      this.calculatingResults = this.toolbarService.calculatingResults;
      this.matchesFound = count;
      this.selectionIncrement = 1;
    });

    this.findReplaceForm = new FormGroup({
      find : new FormControl(null, Validators.required),
      replace: new FormControl(null, Validators.required)
    });

    this.matchesFound = this.toolbarService.matchesFound;
  }

  findText(text: string) {
    this.calculatingResults = true;
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

  replaceSelectedText(find: string, replace: string, formGroup: FormGroup) {
    this.toolbarService.replaceSelectedText(find, replace, formGroup);
   }

  ngOnDestroy() {
    this.subscriptionMatchesCount.unsubscribe();
  }

}
