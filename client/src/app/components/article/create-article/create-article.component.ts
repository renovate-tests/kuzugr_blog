import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../article.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Article } from 'src/app/shared/models/article';
import { Category } from 'src/app/shared/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownService } from 'ngx-markdown';
import { environment } from '../../../../environments/environment';

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
  uploadFileEndpoint: string;
  categories: Array<Category>;

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private markdownService: MarkdownService,
            ) { }

  ngOnInit() {
    this.uploadFileEndpoint = environment.uploadFileEndpoint;
    this.loginCheck();
    this.articleLoaded = false;
    this.articleId = this.route.snapshot.params['article_id'];
    this.loadArticle();
    this.getCategories();
  }

  onSubmit() {
    if (this.form.valid) {
      this.article = this.form.value;
      // this.article.title = this.form.controls.title.value;
      this.article.html_content = this.markdownService.compile(this.form.controls.mark_content.value.trim());
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
      this.form.controls.mark_content.setValue(`${this.form.controls.mark_content.value}\n${markDownImage}`);
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
        mark_content: new FormControl(),
        category_id: new FormControl(),
      });
      this.articleLoaded = true;
    }
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      response => {
        this.form = new FormGroup({
          title: new FormControl(response.title),
          mark_content: new FormControl(response.mark_content),
          category_id: new FormControl(response.category_id),
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

  getCategories() {
    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {
      },
    );
  }
// tslint:disable-next-line:max-file-line-count
}
