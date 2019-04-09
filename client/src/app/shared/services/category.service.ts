import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiEndpoint = environment.apiEndpoint;
  categories: any = null;

  constructor(private http: HttpClient) { }

  async loadCategories() {
    const categories = await this.getCategories();
    return categories.map(item => Object.assign(new Category, item));
  }

  async getCategories(): Promise<Array<Category>> {
    if (this.categories && this.categories.length > 0) {
      return this.categories;
    }
    return this.doRequest();
  }

  private async doRequest(): Promise<Array<Category>> {
    const url = `${this.apiEndpoint}/categories`;
    const response = await this.http.get(url).toPromise();
    this.categories = response;
    return this.categories;
  }
}
