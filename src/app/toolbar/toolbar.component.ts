import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  findReplaceForm: FormGroup;
  matchesFound: number;
  findString: string;

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.findReplaceForm = new FormGroup({
      find : new FormControl(null),
      replace: new FormControl(null)
    });

    this.matchesFound = this.toolbarService.matchesFound;
  }

  findText(text: string) {
    this.toolbarService.findText(text);
  }

  replaceText(find: string, replace: string, formGroup: FormGroup) {
   this.toolbarService.replaceText(find, replace, formGroup);
  }
}
