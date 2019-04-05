import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@services/article.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {
  articleIds: Array<number>;
  articleIdsLoaded: boolean;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleIdsLoaded = false;
    this.articleService.getArticleIdsForSitemap().subscribe(
      response => {
        this.articleIds = response;
        this.articleIdsLoaded = true;
      });
  }

}
