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
        this.addHighlight(stringFind);
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

  addHighlight(stringMatch: string) {
    this.reset();
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(stringMatch, 'gim'), match => {
          return `<span class="highlightText">${match}</span>`;
        }
      ));

    this.textFindService.resultsCount = this.getResultsCount();
    this.textFindService.resultCountUpdated$.next(this.textFindService.resultsCount);
  }

  reset() {
    this.textFindService.resultsCount = null;
    this.textFindService.resultCountUpdated$.next(null);
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(`<span class="highlightText">|</span>`, 'g'), match => {
          return '';
        }
    ));
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
