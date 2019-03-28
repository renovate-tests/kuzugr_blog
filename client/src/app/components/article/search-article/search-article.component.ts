import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../../../shared/models/article';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.scss'],
})
export class SearchArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) { }

  params: any;
  articles: Array<Article>;

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.params = params;
        this.searchArticle();
      },
    );
  }

  searchArticle() {
    this.articleService.searchArticle(this.params).subscribe(
      response => {
        this.articles = response;
      },
      error => {
      },
    );
  }

}
