import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { IDocument } from './document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  document: IDocument;
  findString: string;

  constructor( private documentService: DocumentService, private toolbarService: ToolbarService) { }

  ngOnInit(): void {

    this.getDocument();

    this.toolbarService.findString.subscribe( stringToFind => {
      this.findString = stringToFind;
    });
  }

  getDocument() {
    this.documentService.getDocument$().subscribe((res: any) => {
      this.document = res.content;
    });
  }
}
