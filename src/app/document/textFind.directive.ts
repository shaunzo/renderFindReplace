import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ToolbarService  } from '../toolbar/toolbar.service';

@Directive({
  selector: '[appTextHighlight]'
})

export class TextHighlightDirective implements OnInit {

  nativeElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private toolbarService: ToolbarService) {}

  ngOnInit() {

    this.nativeElement = this.setInitialHTML();

    this.toolbarService.findString.subscribe(string => {
      this.reset();

      if (string && string !== '') {
        this.addHighlight(string);
      } else {
        this.reset();
      }
    });
  }

  addHighlight(stringMatch: string) {
    this.reset();
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(stringMatch, "gim"), match => {
          return `<span class="highlightText">${match}</span>`;
        }
      ));
  }

  reset() {
    this.renderer.setProperty(
      this.elementRef.nativeElement, 'innerHTML', this.elementRef.nativeElement.innerHTML.replace(
        new RegExp(`<span class="highlightText">|</span>`, "g"), match => {
          return '';
        }
    ));
  }

  setInitialHTML() {
    return this.elementRef.nativeElement;
  }
}
