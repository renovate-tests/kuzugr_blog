import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@services/auth.service';
import { ConfirmDialogService } from '@services/confirm-dialog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleLoaded: boolean;
  loginState: boolean;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService,
              private authService: AuthService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.articleLoaded = false;
    this.loginState = false;
    this.route.params.subscribe(params => {
      if (params['article_id']) {
        this.getArticle(params['article_id']);
      } else {
        this.getLatestArticle();
      }
    });
    this.getLoginState();
  }

  getLatestArticle() {
    this.articleService.getArticles({ limit: 1 }).subscribe(
      response => {
        if (response.length > 0) {
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

  changePublishStatus(articleId: number) {
    const dialogTitle = this.article.published ? '非公開' : '公開';
    this.confirmDialogService.showConfirm({
      title: '公開状況変更',
      content: `${dialogTitle}に変更しますか？`,
      acceptButton: '変更する',
      cancelButton: 'キャンセル',
      isDanger: true,
    }).subscribe(confirm => {
      if (confirm) {
        this.articleService.changePublishStatus(articleId).subscribe(
          response => {
            this.article = response;
          },
          error => {
          },
        );
      }
    });
  }
}
