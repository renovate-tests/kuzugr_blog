import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.apiEndpoint}/categories`);
  }
}
