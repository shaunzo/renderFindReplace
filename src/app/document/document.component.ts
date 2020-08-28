import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from './document.service';
import { TextFindService } from '../services/text-find.service';
import { IDocument, IContent } from '../interfaces/document';
import { Subscription } from 'rxjs';
import { IUpdateText } from '../interfaces/update-text';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  subscriptionFindString = new Subscription();
  subscriptionReplaceText = new Subscription();
  subscriptionUpatedDocument = new Subscription();
  document: IDocument;
  content: IContent[];
  findString: string;

  constructor(
    private documentService: DocumentService,
    private textFindService: TextFindService) { }

  ngOnInit(): void {

    this.getDocument();

    this.subscriptionUpatedDocument = this.documentService.documentUpdated$.subscribe( (document) => {
      this.document = JSON.parse(JSON.stringify(document));
    });

    this.subscriptionFindString = this.textFindService.findString$.subscribe( stringToFind => {
      this.findString = stringToFind;
    });

    this.subscriptionReplaceText = this.textFindService.replaceText$.subscribe( (data: IUpdateText[]) => {
      this.updateText(data);
    });
  }

  getDocument() {
    this.documentService.getDocument$().subscribe((res: IDocument) => {
      console.log(res);
      this.document = res;
    });
  }

  updateText(params: IUpdateText[]) {

    const updatedDocument = {...this.document};

    params.forEach((item) => {
      const textToUpdate = this.document.content[item.pIndex].content[item.spanIndex].content[item.contentIndex].text;
      const replacement = textToUpdate.replace(new RegExp(item.textMatch, 'gim'), item.textReplace);
      console.log(replacement);

      updatedDocument.content[item.pIndex].content[item.spanIndex].content[item.contentIndex].text = replacement;
    });

    this.documentService.documentUpdated$.next(updatedDocument);
  }

  ngOnDestroy() {
    this.subscriptionFindString.unsubscribe();
    this.subscriptionReplaceText.unsubscribe();
    this.subscriptionUpatedDocument.unsubscribe();
  }
}
