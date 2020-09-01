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

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private textFindService: TextFindService) {}

  ngOnInit() {
    this.subscriptionFindString = this.textFindService.findString().pipe(debounceTime(500)).subscribe(stringFind => {
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
    this.reset();
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(stringMatch, 'gim'), match => {
          this.renderer.addClass(this.elementRef.nativeElement.parentNode.querySelector('span[apptextfind]'), 'highlighted');
          return `<span class="highlightText">${match}</span>`;
        }
      ));
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

    if (this.highlightedElements[0]) {
      this.renderer.addClass(this.highlightedElements[0], 'selected');

      const indexStrArr = this.renderer.parentNode(this.highlightedElements[0]).id.split('-');
      this.singleSelection.push(parseInt(indexStrArr [0], 10), parseInt(indexStrArr [1], 10), parseInt(indexStrArr [2], 10));
      this.textFindService.resultIndex = this.singleSelection;
    }

    if (indexes && indexes.length > 0) {
      this.matchedIndexes = [];
      indexes.forEach(item => {
        this.matchedIndexes.push(item.id.split('-'));
      });
    }

    const indexesToNumbers = [];
    this.matchedIndexes.forEach(item => {
      indexesToNumbers.push([parseInt(item[0], 10), parseInt(item[1], 10), parseInt(item[2], 10) ]);
    });

    this.textFindService.resultIndexes = indexesToNumbers;
  }

  reset() {
    this.singleSelection = [];
    this.matchedIndexes = [];
    this.textFindService.resultsCount = null;
    this.textFindService.resultCountUpdated$.next(null);
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(`<span class="highlightText">|</span>|<span class="highlightText selected">`, 'g'), match => {
          return '';
        }
    ));
    this.textFindService.resultIndexes = [];
    this.renderer.removeClass(this.elementRef.nativeElement.parentNode.querySelector('span[apptextfind]'), 'selected');
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
