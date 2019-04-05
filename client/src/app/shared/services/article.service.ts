import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '@models/article';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiEndpoint = environment.apiEndpoint;
  latestArticles: any;

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

  editArticle(article: Article, articleId: number): Observable<Article> {
    return this.http.patch<Article>(`${this.apiEndpoint}/articles/${articleId}`, { article: article } );
  }

  searchArticle(params = {}): Observable<Array<Article>> {
    return this.http.get<Array<Article>>(`${this.apiEndpoint}/articles/search`, { params: params }  );
  }

  changePublishStatus(articleId: number): Observable<Article> {
    return this.http.post<Article>(`${this.apiEndpoint}/articles/update_publish_status`, { id: articleId }  );
  }

  getArticleIdsForSitemap(): any {
    return this.http.get<any>(`${this.apiEndpoint}/articles/article_ids_for_sitemap`);
  }

  async loadLatestArticles() {
    const articles = await this.getLatesAticles();
    return articles.map(item => Object.assign(new Article, item));
  }

  async getLatesAticles(): Promise<Array<Article>> {
    if (this.latestArticles && this.latestArticles.length > 0) {
      return this.latestArticles;
    }
    return this.doRequest();
  }

  private async doRequest(): Promise<Array<Article>> {
    const url = `${this.apiEndpoint}/articles`;
    const response = await this.http.get(url).toPromise();
    this.latestArticles = response;
    return this.latestArticles;
  }
}
