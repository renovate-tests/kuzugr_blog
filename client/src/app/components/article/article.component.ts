import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articles: Array<Article>;
  article: Article;
  articleLoaded: boolean;
  loginState: boolean;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService,
              private authService: AuthService) { }

  ngOnInit() {
    this.articleLoaded = false;
    this.loginState = false;
    this.route.params.subscribe(params => {
      if (params['article_id']) {
        this.getArticle(params['article_id']);
      } else {
        this.getArticles();
      }
    });
    this.getLoginState();
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

  getLoginState() {
    const loginEmail = this.cookieService.get('login_email');
    if (!!loginEmail) {
      this.loginState = this.authService.loginState().then(
        response => {
          this.loginState = response['login_state'];
        },
        error => {
        },
      );
    }
  }
}
