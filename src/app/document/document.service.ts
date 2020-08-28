import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { IDocument } from '../interfaces/document';
import { IUpdateText } from '../interfaces/update-text';
import { TextFindService } from '../services/text-find.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentService implements OnDestroy {

  subscriptionFindString = new Subscription();
  subscriptionReplaceText = new Subscription();
  subscriptionUpatedDocument = new Subscription();
  documentUpdated$ = new Subject<IDocument>();
  findString: string;
  document: IDocument;

  constructor(private httpClient: HttpClient, private textFindService: TextFindService) {

    this.subscriptionUpatedDocument = this.documentUpdated$.subscribe( (document) => {
      this.document = JSON.parse(JSON.stringify(document));
    });

    this.subscriptionFindString = this.textFindService.findString$.subscribe( stringToFind => {
      this.findString = stringToFind;
    });

    this.subscriptionReplaceText = this.textFindService.replaceText$.subscribe( (data: IUpdateText[]) => {
      this.updateText(data);
    });
  }

  getDocument$() {
    return this.httpClient.get('assets/data/public/Q1-sample-text.json');
  }

  updateText(params: IUpdateText[]) {
    const updatedDocument = {...this.document};
    params.forEach((item) => {
      const textToUpdate = this.document.content[item.pIndex].content[item.spanIndex].content[item.contentIndex].text;
      const replacement = textToUpdate.replace(new RegExp(item.textMatch, 'gim'), item.textReplace);
      updatedDocument.content[item.pIndex].content[item.spanIndex].content[item.contentIndex].text = replacement;
    });

    this.documentUpdated$.next(updatedDocument);
  }

  ngOnDestroy() {
    this.subscriptionFindString.unsubscribe();
    this.subscriptionReplaceText.unsubscribe();
    this.subscriptionUpatedDocument.unsubscribe();
  }
}
