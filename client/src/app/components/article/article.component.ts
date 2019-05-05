import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ConfirmDialogService } from '../../shared/services//confirm-dialog.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleLoaded: boolean;
  loginState: boolean;
  articleId: number;
  blogTitle = environment.title;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private confirmDialogService: ConfirmDialogService,
    private metaService: Meta,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.articleLoaded = false;
    this.loginState = false;
    this.route.params.subscribe((params) => {
      if (params['article_id']) {
        this.articleId = params['article_id'];
        this.getArticle(params['article_id']);
      } else {
        this.getLatestArticle();
      }
    });
    this.getLoginState();
  }

  getLatestArticle() {
    this.articleService.getArticles({ limit: 1 }).subscribe((response) => {
      if (response.length > 0) {
        this.article = response[0];
        this.titleService.setTitle(this.article.title);
        this.setMetaTag();
        this.articleLoaded = true;
      }
    });
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe((response) => {
      this.article = response;
      this.titleService.setTitle(this.article.title);
      this.setMetaTag();
      this.articleLoaded = true;
    });
  }

  getLoginState() {
    this.authService.loginState().then(
      (response) => {
        this.loginState = response['login_state'];
      },
      (error) => {},
    );
  }

  changePublishStatus(articleId: number) {
    const dialogTitle = this.article.published ? '非公開' : '公開';
    this.confirmDialogService
      .showConfirm({
        title: '公開状況変更',
        content: `${dialogTitle}に変更しますか？`,
        acceptButton: '変更する',
        cancelButton: 'キャンセル',
        isDanger: true,
      })
      .subscribe((confirm) => {
        if (confirm) {
          this.articleService.changePublishStatus(articleId).subscribe(
            (response) => {
              this.article = response;
            },
            (error) => {},
          );
        }
      });
  }

  setMetaTag() {
    const articleContent = this.article.html_content
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
      .replace(/\r?\n/g, '')
      .trim();
    const description = this.article.description || articleContent;
    this.metaService.addTag({ name: 'description', content: description });
    this.metaService.addTag({ property: 'og:title', content: this.article.title });
    this.metaService.addTag({ property: 'og:description', content: description });
    this.metaService.addTag({ property: 'og:type', content: 'article' });
    const url = this.articleId ? `https://kuzugr.com/article/${this.articleId}` : 'https://kuzugr.com';
    this.metaService.addTag({ property: 'og:url', content: url });
    this.metaService.addTag({ property: 'og:image', content: this.article.thumbnail_url });
    this.metaService.addTag({ property: 'fb:app_id', content: '343030139677133' });
    this.metaService.addTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.metaService.addTag({ property: 'twitter:site', content: '@kuzugr' });
    this.metaService.addTag({ property: 'twitter:creator', content: '@kuzugr' });
  }
  // tslint:disable-next-line:max-file-line-count
}
