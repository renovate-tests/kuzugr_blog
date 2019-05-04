import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  tweet(tweet: Tweet): any {
    return this.http.post<any>(`${this.apiEndpoint}/tweet`, { tweet: tweet });
  }
}
