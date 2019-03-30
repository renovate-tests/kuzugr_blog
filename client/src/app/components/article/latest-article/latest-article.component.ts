import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-latest-article',
  templateUrl: './latest-article.component.html',
  styleUrls: ['./latest-article.component.scss'],
})
export class LatestArticleComponent implements OnInit {
  articles: Array<Article>;
  article: Article;
  articleLoaded: boolean;
  index: number;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleLoaded = false;
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles({ limit: 5 }).subscribe(
      response => {
        this.articles = response;
        if (this.articles[0]) {
          this.index = 0;
          this.setArticle();
          Observable.interval(3000).subscribe(
            () => {
              this.index = this.index + 1;
              if (!this.articles[this.index]) {
                this.index = 0;
              }
              this.setArticle();
            },
          );
        }
      },
    );
  }

  setArticle() {
    this.article = this.articles[this.index];
    this.articleLoaded = true;
  }

  dataLoaded(): boolean {
    return this.articleLoaded;
  }
}
