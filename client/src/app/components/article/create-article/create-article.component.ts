import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateForm } from '../../../shared/functions/validate-forms';
import { ArticleService } from '../../../shared/services//article.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Article } from '../../../shared/models/article';
import { Category } from '../../../shared/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth.service';

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
  categoryLoaded: boolean;
  gotError: boolean;
  formErrors: {[key: string]: Array<string>} = {};
  validationMessages = {
    'title': {
      'required': 'タイトルを入力してください。',
      'maxlength': 'タイトルは300文字以内で入力してください。',
    },
    'mark_content': {
      'required': '本文を入力してください。',
    },
    'category_id': {
      'required': 'カテゴリを選択してください。',
    },
  };

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private markdownService: MarkdownService,
              private authService: AuthService,
            ) { }

  ngOnInit() {
    this.categoryLoaded = false;
    this.uploadFileEndpoint = environment.uploadFileEndpoint;
    this.getLoginState();
    this.articleLoaded = false;
    this.articleId = this.route.snapshot.params['article_id'];
    this.loadArticle();
    this.loadCategories();
  }

  onSubmit() {
    this.gotError = false;
    this.formErrors = {};
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
    } else {
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
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
        this.gotError = true;
      },
    );
  }

  editArticle() {
    this.articleService.editArticle(this.article, this.articleId).subscribe(
      response => {
        this.router.navigateByUrl(`/article/${this.articleId}`);
      },
      error => {
        this.gotError = true;
      },
    );
  }

  loadArticle() {
    if (this.articleId) {
      this.getArticle(this.articleId);
    } else {
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(300)]),
        mark_content: new FormControl('', [Validators.required]),
        category_id: new FormControl('', [Validators.required]),
      });
      this.articleLoaded = true;
    }
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      response => {
        this.form = new FormGroup({
          title: new FormControl(response.title, [Validators.required, Validators.maxLength(50)]),
          mark_content: new FormControl(response.mark_content, [Validators.required]),
          category_id: new FormControl(response.category_id, [Validators.required]),
        });
        this.articleLoaded = true;
      },
      error => {
      },
    );
  }

  async loadCategories() {
    this.categoryService.loadCategories().then((categories) => {
      if (!!categories) {
        this.categories = categories;
        this.categoryLoaded = true;
      }
    });
  }

  getLoginState() {
    this.authService.loginState().then(
      response => {
        if ( response['login_state'] === false ) {
          this.router.navigateByUrl(`/`);
        }
      },
      error => {
      },
    );
  }
// tslint:disable-next-line:max-file-line-count
}
