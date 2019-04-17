import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ArticleService } from '../../../shared/services/article.service';

@Component({
  selector: 'app-monthly-archive',
  templateUrl: './monthly-archive.component.html',
  styleUrls: ['./monthly-archive.component.scss'],
  animations: [
    trigger('accordion', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('200ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('200ms', style({ height: '0' })),
      ]),
    ]),
  ],
})
export class MonthlyArchiveComponent implements OnInit {
  showDetail: boolean;
  years: Array<string>;
  archives: any;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArchives().subscribe(
      response => {
        this.archives = response;
      },
    );
  }

  onAccordion(year) {
    if ( this.showDetail === year ) {
      this.showDetail = null;
    } else {
      this.showDetail = year;
    }
  }
}
