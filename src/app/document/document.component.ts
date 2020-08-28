import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from './document.service';
import { IDocument, IContent } from '../interfaces/document';
import { Subscription } from 'rxjs';
import { IUpdateText } from '../interfaces/update-text';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  subscriptionReplaceText = new Subscription();
  subscriptionUpatedDocument = new Subscription();
  document: IDocument;
  content: IContent[];
  findString: string;

  constructor(
    private documentService: DocumentService) { }

  ngOnInit(): void {
    this.getDocument();
    this.document = this.documentService.document;
    this.findString = this.documentService.findString;

    this.subscriptionUpatedDocument = this.documentService.documentUpdated$.subscribe( (document) => {
      this.document = JSON.parse(JSON.stringify(document));
    });
  }

  getDocument() {
    this.documentService.getDocument$().subscribe((res: IDocument) => {
      this.document = res;
      this.documentService.documentUpdated$.next(this.document);
    });
  }

  updateText(params: IUpdateText[]) {
    this.documentService.updateText(params);
  }

  ngOnDestroy() {
    this.subscriptionReplaceText.unsubscribe();
    this.subscriptionUpatedDocument.unsubscribe();
  }
}
