import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { Observable } from 'rxjs';
import { IDocument } from './document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  document: IDocument;

  constructor( private documentService: DocumentService) { }

  ngOnInit(): void {

    this.getDocument();
  }

  getDocument() {
    this.documentService.getDocument$().subscribe((res: any) => {
      this.document = res.content;
      console.log(this.document);
    });
  }

}
