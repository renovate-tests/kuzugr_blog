import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-monthly-archive',
  templateUrl: './monthly-archive.component.html',
  styleUrls: ['./monthly-archive.component.scss'],
  animations: [
    trigger('accordion', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('500ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('500ms', style({ height: '0' })),
      ]),
    ]),
  ],
})
export class MonthlyArchiveComponent implements OnInit {
  showDetail: boolean;

  constructor() { }

  ngOnInit() {
  }

  onAccordion() {
    this.showDetail = !this.showDetail;
  }
}
