import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Comment } from '@models/comment';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getComments(articleId: number): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.apiEndpoint}/comments?article_id=${articleId}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiEndpoint}/comments`, { comment: comment } );
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this.apiEndpoint}/comments/${commentId}`);
  }
}
