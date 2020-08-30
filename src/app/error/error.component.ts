import { Component, OnInit, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  faTimesCircle = faTimesCircle;

  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
