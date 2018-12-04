import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from 'src/app/shared/models/article';
import { ArticlesResponse } from './articles-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getArticles(params = {}): Observable<Array<Article>> {
    return this.http.get<Array<Article>>(`${this.apiEndpoint}/articles`, { params: params } );
  }

  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiEndpoint}/articles/${articleId}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiEndpoint}/articles/`, { article: article } );
  }
}
