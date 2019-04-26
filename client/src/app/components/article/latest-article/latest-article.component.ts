import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/services/article.service';
import { Article } from '../../../shared/models/article';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-latest-article',
  templateUrl: './latest-article.component.html',
  styleUrls: ['./latest-article.component.scss'],
})
export class LatestArticleComponent implements OnInit {
  latestArticles: Array<Article>;
  article: Article;
  latestArticleLoaded: boolean;
  index: number;
  startFlag: boolean;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.startFlag = false;
    this.latestArticleLoaded = false;
    this.loadLatestArtciles();
  }

  setArticle() {
    this.article = this.latestArticles[this.index];
    this.latestArticleLoaded = true;
  }

  async loadLatestArtciles() {
    this.articleService.loadLatestArticles().then((articles) => {
      if (!!articles) {
        this.latestArticles = articles;
        if (this.latestArticles[0]) {
          this.index = 0;
          this.setArticle();
        }
      }
    });
  }

  changeImage() {
    if (this.startFlag) {
      return;
    } else {
      this.startFlag = true;
    }
    Observable.interval(3000).subscribe(() => {
      this.index = this.index + 1;
      if (!this.latestArticles[this.index]) {
        this.index = 0;
      }
      this.setArticle();
    });
  }
}
