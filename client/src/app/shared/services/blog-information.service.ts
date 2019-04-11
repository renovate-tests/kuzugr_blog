import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { BlogInformation } from '../models/blog-information';

@Injectable({
  providedIn: 'root',
})
export class BlogInformationService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getBlogInformation(): Observable<BlogInformation> {
    return this.http.get<BlogInformation>(`${this.apiEndpoint}/blog_informations`);
  }
}
