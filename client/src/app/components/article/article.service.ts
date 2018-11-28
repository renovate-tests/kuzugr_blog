import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from 'src/app/shared/models/article';
import { ArticlesResponse } from './articles-response';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiEndpoint = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  getArticles(params = {}): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(`${this.apiEndpoint}/articles`, { params: params } );
  }

  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiEndpoint}/articles/${articleId}`);
  }
}
