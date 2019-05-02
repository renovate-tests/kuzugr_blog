import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.scss'],
})
export class SearchCategoryComponent implements OnInit {
  categoryLoaded: boolean;
  categories: Array<Category>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryLoaded = false;
    this.loadCategories();
  }

  async loadCategories() {
    this.categoryService.loadCategories().then((categories) => {
      if (!!categories) {
        this.categories = categories;
        this.categoryLoaded = true;
      }
    });
  }
}
