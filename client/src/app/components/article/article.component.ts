import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from 'src/app/shared/models/article';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ArticlesResponse } from './articles-response';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Array<Article>;
  article: Article;
  articleLoaded: boolean;

  constructor(private articleService: ArticleService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.articleLoaded = false;
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles({ limit: 5 }).subscribe(
      response => {
        this.articles = response;
        this.getArticle(this.articles[0].id);
      }
    );
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      response => {
        this.article = response;
        this.articleLoaded = true;
      }
    );
  }

  dataLoaded(): boolean {
    return this.articleLoaded;
  }
}
