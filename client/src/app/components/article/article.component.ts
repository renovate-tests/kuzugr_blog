import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articles: Array<Article>;
  article: Article;
  articleLoaded: boolean;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleLoaded = false;
    this.route.params.subscribe(params => {
      if (params['article_id']) {
        this.getArticle(params['article_id']);
      } else {
        this.getArticles();
      }
    })
  }

  getArticles() {
    this.articleService.getArticles({ limit: 1 }).subscribe(
      response => {
        if (response.length > 0) {
          this.articles = response;
          this.article = response[0];
          this.articleLoaded = true;
        }
      },
    );
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      response => {
        this.article = response;
        this.articleLoaded = true;
      },
    );
  }
}
