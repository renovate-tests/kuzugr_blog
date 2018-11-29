import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/shared/models/article';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup;
  article: Article;

  constructor(private articleService: ArticleService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.loginCheck();
    this.form = new FormGroup({
      title: new FormControl(),
      content: new FormControl()
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.article = this.form.value;

      this.articleService.createArticle(this.article).subscribe(
        data => {
          this.router.navigateByUrl(`/`);
        },
        error => {
          // エラーメッセージを出す
        }
      );
    }
  }

  // TODO: serviceに置き換える
  loginCheck() {
    if (!!!this.cookieService.get('login_email')) {
      this.router.navigateByUrl(`/`);
    }
  }

}
