import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { TextFindService } from '../services/text-find.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appTextFind]',
})
export class TextFindDirective implements OnInit, OnDestroy {

  matchedIndexes = [];
  singleSelection = [];
  subscriptionFindString = new Subscription();
  subscriptionFormReset = new Subscription();
  subscriptionSelectInstance = new Subscription();
  highlightedElements: any[];
  documentHTML: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private textFindService: TextFindService) {
    }

  ngOnInit() {

    this.subscriptionFindString = this.textFindService.findString$.pipe(debounceTime(500)).subscribe(stringFind => {
      this.reset();
      if (stringFind && stringFind !== '') {
        this.makeSelection(stringFind);
      } else {
        this.reset();
      }
    });

    this.subscriptionFormReset = this.textFindService.formReset$.subscribe(resetForm => {
      if (resetForm) {
        this.reset();
      }
    });

    this.subscriptionSelectInstance = this.textFindService.selectMatchInstance$.subscribe(index => {
      this.selectResultInstance(index);
    });
  }

  makeSelection(stringMatch: string) {
    const regex = `(?<!<[^>]*)${stringMatch}`;

    this.reset();

    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(regex, 'gim'), match => {
          return `<span class="highlightText">${match}</span>`;
        }
      )
    );

    this.textFindService.resultsCount = this.getResultsCount();
    this.textFindService.resultCountUpdated$.next(this.textFindService.resultsCount);
    this.updateResultIndexes();
  }

  selectResultInstance(index: number) {

    const selected = this.renderer.selectRootElement('app-root', true).querySelectorAll('.highlightText.selected')[0];

    if (selected) {
      this.renderer.removeClass(selected, 'selected');
    }

    if (this.highlightedElements[index]) {
      this.singleSelection = [];
      this.renderer.addClass(this.highlightedElements[index], 'selected');

      const indexStrArr = this.renderer.parentNode(this.highlightedElements[index]).id.split('-');
      this.singleSelection.push(parseInt(indexStrArr [0], 10), parseInt(indexStrArr [1], 10), parseInt(indexStrArr [2], 10));
      this.textFindService.resultIndex = this.singleSelection;
    }
  }

  updateResultIndexes() {

    const indexes = this.renderer.selectRootElement('app-root', true).querySelectorAll('.highlighted');

    this.highlightedElements = this.renderer.selectRootElement('app-root', true).querySelectorAll('.highlightText');

    const parentElements = Array.from(this.renderer.selectRootElement('app-root', true).querySelectorAll('.doc-text')).map(
      (item: any) => {
      if (item.children[0] && item.children[0].classList[0] === 'highlightText') {
        return item.id;
      }
    }).filter(item => {
      return item !== undefined;
    });

    parentElements.forEach(id => {
      this.renderer.addClass(this.renderer.selectRootElement(document).getElementById(id), 'highlighted');
    });

    if (this.highlightedElements[0]) {
      this.renderer.addClass(this.highlightedElements[0], 'selected');
      const indexStrArr = this.renderer.parentNode(this.highlightedElements[0]).id.split('-');
      this.singleSelection.push(parseInt(indexStrArr [0], 10), parseInt(indexStrArr [1], 10), parseInt(indexStrArr [2], 10));
      this.textFindService.resultIndex = this.singleSelection;
    }

    if (indexes && indexes.length > 0) {
      const indexesArr = Array.from(indexes);
      this.matchedIndexes = indexesArr.map((item: any) => {
        return item.id.split('-');
      });
    }

    const indexesToNumbers = this.matchedIndexes.map((item: any) => {
      return [parseInt(item[0], 10), parseInt(item[1], 10), parseInt(item[2], 10)];
    });

    this.textFindService.resultIndexes = indexesToNumbers;
  }

  reset() {

    this.singleSelection = [];
    this.matchedIndexes = [];
    this.textFindService.resultsCount = null;
    this.textFindService.resultCountUpdated$.next(null);

    const wordRegex = /(?<openSpan><span class="highlightText">|<span class="highlightText selected">)(?<word>\w+)(?<closeSpan><\/span>)/gi;
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(wordRegex, '$<word>')
     );

    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML
      .replace('class="doc-text highlighted"', 'class="doc-text"')
    );

    this.textFindService.resultIndexes = [];
  }

  getResultsCount() {
    const count = this.renderer.selectRootElement('app-root', true).querySelectorAll('.highlightText').length;
    if (count > 0) {
      return count;
    } else {
      this.reset();
      return null;
    }
  }


  ngOnDestroy() {
    this.subscriptionFindString.unsubscribe();
    this.subscriptionFormReset.unsubscribe();
    this.subscriptionSelectInstance.unsubscribe();
  }
}
