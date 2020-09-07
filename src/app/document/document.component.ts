import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2 } from '@angular/core';
import { DocumentService } from './document.service';
import { IDocument, IContent } from '../interfaces/document';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IUpdateText } from '../interfaces/update-text';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';

import { TextFindService } from '../services/text-find.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  @ViewChild('documentEl') documentEl: ElementRef;

  document: IDocument;
  content: IContent[];
  loading = true;
  error = false;

  matchedIndexes = [];
  singleSelection = [];
  highlightedElements: any[];
  subscriptionFindString = new Subscription();
  subscriptionFormReset = new Subscription();
  subscriptionSelectInstance = new Subscription();
  subscriptionReplaceText = new Subscription();
  subscriptionUpatedDocument = new Subscription();

  constructor(
    private documentService: DocumentService,
    private renderer: Renderer2,
    private textFindService: TextFindService) {}

    ngOnInit(): void {

      this.getDocument();

      this.subscriptionUpatedDocument = this.documentService.documentUpdated$.subscribe(
        (res) => {
          this.document = JSON.parse(JSON.stringify(res));
          this.loading = false;
        }
      );

      this.textFindService.replaceText$.subscribe((data: IUpdateText[]) => {
        this.updateText(data);
     });

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

  updateText(data: IUpdateText[]) {
    const find = data[0].textMatch;
    const replace = data[0].textReplace;
    const regex = `(?<!<[^>]*)${find}`;

    if (!data[0].onlySelected) {
      this.renderer.setProperty(
        this.documentEl.nativeElement, 'innerHTML', this.documentEl.nativeElement.innerHTML.replace(
          new RegExp(regex, 'gim'), match => {
            return `<span class="highlightText">${replace}</span>`;
          }
        )
      );
    } else {
      this.renderer.setProperty(
        this.documentEl.nativeElement, 'innerHTML', this.documentEl.nativeElement.innerHTML.replace(
          new RegExp(`<span class="highlightText selected">${find}</span>`, 'i'), match => {
            return `<span class="highlightText selected">${replace}</span>`;
          }
        )
      );
    }
    this.reset();
  }

  getDocument() {
    this.documentService.getDocument$().subscribe(
      (res: IDocument) => {
        this.documentService.document = res;
        this.documentService.documentUpdated$.next(res);
        this.loading = false;
        this.error = false;
      },
      (error) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  makeSelection(stringMatch: string) {
    const regex = `(?<!<[^>]*)${stringMatch}`;

    this.reset();

    this.renderer.setProperty(
      this.documentEl.nativeElement, 'innerHTML', this.documentEl.nativeElement.innerHTML.replace(
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

  groupHighlightedText() {
    const parentElements = Array.from(this.documentEl.nativeElement.querySelectorAll('.doc-text')).map(
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
  }

  updateResultIndexes() {
    this.groupHighlightedText();

    const indexes = this.documentEl.nativeElement.querySelectorAll('.highlighted');

    this.highlightedElements = this.renderer.selectRootElement('app-root', true).querySelectorAll('.highlightText');

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

    const wordRegex =
    /(?<openSpan><span class="highlightText">|<span class="highlightText selected">)(?<word>\w+|\s)(?<closeSpan><\/span>)/gim;
    this.renderer.setProperty(
      this.documentEl.nativeElement, 'innerHTML', this.documentEl.nativeElement.innerHTML.replace(wordRegex, '$<word>')
     );

    this.renderer.setProperty(
      this.documentEl.nativeElement, 'innerHTML', this.documentEl.nativeElement.innerHTML
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
  }
}
