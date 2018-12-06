import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/shared/models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup;
  article: Article;
  articleLoaded: boolean;
  articleId: number;
  apiEndpoint = environment.apiEndpoint;
  public uploadResult: any = null;


  constructor(private articleService: ArticleService,
              private router: Router,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private http: HttpClient
            ) { firebase.initializeApp(environment.firebase); }

  ngOnInit() {
    this.loginCheck();
    this.articleLoaded = false;
    this.articleId = this.route.snapshot.params['article_id'];
    this.loadArticle();
  }

  onSubmit() {
    if (this.form.valid) {
      this.article = this.form.value;
      this.uploadFile();
      if (this.articleId) {
        // this.editArticle();
      } else {
        // this.createArticle();
      }
    }
  }

  uploadFile() {
    const file_element = <HTMLInputElement>document.getElementById('thumbnail');
    const file = file_element.files[0];
    const storageRef = firebase.storage().ref(`upload_files/${file.name}`);
    storageRef.put(file).then(
      upload_response => {
        // ここではアップロー済みの画像を表示するため結果をメンバ変数に格納
        this.uploadResult = upload_response;
        storageRef.getDownloadURL().then(
          download_url => {
            console.log(download_url);
          }
        ).catch(
          download_error => {
            console.log(download_error);
          }
        );
      }
    ).catch(
      err => console.log(err)
    );
  }

  createArticle() {
    this.articleService.createArticle(this.article).subscribe(
      response => {
        this.router.navigateByUrl(`/`);
      },
      error => {
        // エラーメッセージを出す
      }
    );
  }

  editArticle() {
    this.articleService.editArticle(this.article, this.articleId).subscribe(
      response => {
        this.router.navigateByUrl(`/article/${this.articleId}`);
      }
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
        content: new FormControl(),
        thumbnail: new FormControl()
      });
      this.articleLoaded = true;
    }
  }

  getArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe(
      response => {
        this.form = new FormGroup({
          title: new FormControl(response.title),
          content: new FormControl(response.content),
          thumbnail: new FormControl(response.thumbnail)
        });
        this.articleLoaded = true;
      },
      error => {
        this.articleLoaded = true;
      }
    );
  }

  dataLoaded(): boolean {
    return this.articleLoaded;
  }
}
