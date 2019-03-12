import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/shared/models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup;
  article: Article;
  articleLoaded: boolean;
  articleId: number;
  uploadFileUuids = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private markdownService: MarkdownService,
            ) { }

  ngOnInit() {
    this.loginCheck();
    this.articleLoaded = false;
    this.articleId = this.route.snapshot.params['article_id'];
    this.loadArticle();
  }

  onSubmit() {
    if (this.form.valid) {
      this.article = this.form.value;
      // this.article.title = this.form.controls.title.value;
      this.article.mark_content = this.markdownService.compile(this.form.controls.html_content.value.trim());
      this.article.upload_file_uuids = this.uploadFileUuids;
      // this.article = this.form.value;
      if (this.articleId) {
        this.editArticle();
      } else {
        this.createArticle();
      }
    }
  }

  onUploadFinished(response) {
    // NOTE: 使用する画像のuuidを配列で保持しておく、また自動的に画像を入力欄に挿入する
    if ( response.serverResponse.status === 200 ) {
      const responseBody = JSON.parse(response.serverResponse.response._body);
      this.uploadFileUuids.push(responseBody.uuid);
      const markDownImage = `![image description](${responseBody.public_url} "image title")`;
      this.form.controls.html_content.setValue(`${this.form.controls.html_content.value}\n${markDownImage}`);
    }
  }

  createArticle() {
    this.articleService.createArticle(this.article).subscribe(
      response => {
        this.router.navigateByUrl(`/`);
      },
      error => {
        // エラーメッセージを出す
      },
    );
  }

  editArticle() {
    this.articleService.editArticle(this.article, this.articleId).subscribe(
      response => {
        this.router.navigateByUrl(`/article/${this.articleId}`);
      },
    );
  }

  // TODO: serviceに置き換える
  loginCheck() {
    if (!!!this.cookieService.get('login_email')) {
      this.router.navigateByUrl(`/`);
    }
  }

  loadArticle() {
    if (this.articleId) {
      this.getArticle(this.articleId);
    } else {
      this.form = new FormGroup({
        title: new FormControl(),
        html_content: new FormControl(),
      });
      this.articleLoaded = true;
    }
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      response => {
        this.form = new FormGroup({
          title: new FormControl(response.title),
          html_content: new FormControl(response.html_content),
        });
        this.articleLoaded = true;
      },
      error => {
        this.articleLoaded = true;
      },
    );
  }

  dataLoaded(): boolean {
    return this.articleLoaded;
  }
// tslint:disable-next-line:max-file-line-count
}
