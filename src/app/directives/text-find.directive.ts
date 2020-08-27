import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { TextFindService } from '../services/text-find.service';

@Directive({
  selector: '[appTextFind]',
})
export class TextFindDirective implements OnInit {

  nativeElement: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private textFindService: TextFindService) {}

  ngOnInit() {

    this.nativeElement = this.setInitialHTML();

    this.textFindService.findString.subscribe(stringFind => {
      this.reset();

      if (stringFind && stringFind !== '') {
        this.addHighlight(stringFind);
      } else {
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

    this.textFindService.resultsCount += 1;

    console.log(this.textFindService.resultsCount);
  }

  reset() {
    this.textFindService.resultsCount = 0;
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(`<span class="highlightText">|</span>`, 'g'), match => {
          return '';
        }
    ));
  }

  setInitialHTML() {
    return this.elementRef.nativeElement;
  }

}
