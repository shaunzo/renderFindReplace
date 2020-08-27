import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from './document.service';
import { TextFindService } from '../services/text-find.service';
import { IDocument } from './document';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  subscriptionFindString = new Subscription();
  document: IDocument;
  findString: string;

  constructor(
    private documentService: DocumentService,
    private textFindService: TextFindService) { }

  ngOnInit(): void {

    this.getDocument();

    this.subscriptionFindString = this.textFindService.findString$.subscribe( stringToFind => {
      this.findString = stringToFind;
    });
  }

  getDocument() {
    this.documentService.getDocument$().subscribe((res: any) => {
      this.document = res.content;
    });
  }

  ngOnDestroy() {
    this.subscriptionFindString.unsubscribe();
  }
}
