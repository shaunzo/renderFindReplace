import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { TextFindService } from '../services/text-find.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTextFind]',
})
export class TextFindDirective implements OnInit, OnDestroy {

  matchedIndexes = [];
  subscriptionFindString = new Subscription();
  subscriptionFormReset = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private textFindService: TextFindService) {}

  ngOnInit() {


    this.subscriptionFindString = this.textFindService.findString$.subscribe(stringFind => {
      this.reset();
      if (stringFind && stringFind !== '') {
        this.makeSelection(stringFind);
      } else {
        this.reset();
      }
    });


    this.subscriptionFormReset = this.textFindService.formReset$.subscribe( resetForm => {
      if (resetForm) {
        this.reset();
      }
    });
  }

  makeSelection(stringMatch: string) {
    this.reset();
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(stringMatch, 'gim'), match => {
          this.renderer.addClass(this.elementRef.nativeElement.parentNode.querySelector('span[apptextfind]'), 'selected');
          return `<span class="highlightText">${match}</span>`;
        }
      ));
    this.textFindService.resultsCount = this.getResultsCount();
    this.textFindService.resultCountUpdated$.next(this.textFindService.resultsCount);
    this.updateResultIndexes();
  }

  updateResultIndexes() {
    const indexes = this.renderer.selectRootElement('app-root', true).querySelectorAll('.selected');

    if (indexes && indexes.length > 0) {
      this.matchedIndexes = [];
      indexes.forEach(item => {
        this.matchedIndexes.push(item.id.split('-'));
      });
    }

    const indexesToNumbers = [];
    this.matchedIndexes.forEach(item => { indexesToNumbers.push([parseInt(item[0], 10), parseInt(item[1], 10), parseInt(item[2], 10) ]); });

    this.textFindService.resultIndexes = indexesToNumbers;
  }

  reset() {
    this.matchedIndexes = [];
    this.textFindService.resultsCount = null;
    this.textFindService.resultCountUpdated$.next(null);
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(`<span class="highlightText">|</span>`, 'g'), match => {
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
  }

}
