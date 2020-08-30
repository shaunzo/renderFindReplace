import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from './document.service';
import { IDocument, IContent } from '../interfaces/document';
import { Subscription } from 'rxjs';
import { IUpdateText } from '../interfaces/update-text';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';

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
  loading = true;
  error = false;

  constructor(
    private documentService: DocumentService) { }

  ngOnInit(): void {
    this.getDocument();
    this.document = this.documentService.document;
    this.findString = this.documentService.findString;

    this.subscriptionUpatedDocument = this.documentService.documentUpdated$.subscribe(
      (res) => {
        this.document = JSON.parse(JSON.stringify(res));
        this.loading = false;
      }
    );
  }

  getDocument() {
    this.documentService.getDocument$().subscribe(
      (res: IDocument) => {
          this.document = res;
          this.loading = false;
          this.error = false;
          this.documentService.documentUpdated$.next(this.document);
      },
      (error) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  updateText(params: IUpdateText[]) {
    this.documentService.updateText(params);
    /**
     * Call to update record on API will go here
     */
  }

  ngOnDestroy() {
    this.subscriptionReplaceText.unsubscribe();
    this.subscriptionUpatedDocument.unsubscribe();
  }
}
