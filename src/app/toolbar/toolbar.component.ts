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

  constructor( private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.findReplaceForm = new FormGroup({
      find : new FormControl(null),
      replace: new FormControl(null)
    });
  }

  findText() {
    this.toolbarService.findString.next(this.findReplaceForm.value.find);
  }

  replaceText() {
    console.log(this.findReplaceForm);
  }

}
