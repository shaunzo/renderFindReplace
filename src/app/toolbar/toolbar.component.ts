import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TextFindService } from '../services/text-find.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  findReplaceForm: FormGroup;

  matchesFound: number;
  findString: string;

  constructor(private textFindService: TextFindService) { }

  ngOnInit(): void {
    this.findReplaceForm = new FormGroup({
      find : new FormControl(null),
      replace: new FormControl(null)
    });

    this.matchesFound = this.textFindService.resultsCount;

    console.log(this.matchesFound);
  }

  findText() {
    this.textFindService.findString.next(this.findReplaceForm.value.find);
    this.matchesFound = this.textFindService.resultsCount;

    console.log(this.matchesFound);
  }

  replaceText() {
    console.log(this.findReplaceForm);
  }

}
