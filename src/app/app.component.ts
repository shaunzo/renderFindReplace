import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document/document.service';
import { IDocument } from './interfaces/document';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor() {}

  ngOnInit() {}

}
