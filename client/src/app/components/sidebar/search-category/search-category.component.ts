import { Component, OnInit } from '@angular/core';
import { Category } from '@models/category';
import { CategoryService } from '@services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.scss'],
})
export class SearchCategoryComponent implements OnInit {
  categoryLoaded: boolean;
  categories: Array<Category>;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

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

  searchWithCategory(categoryId: number) {
    this.router.navigateByUrl(`/search?category=${categoryId}`);
  }

}
