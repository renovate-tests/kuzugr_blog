import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../shared/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.scss'],
})
export class SearchCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  categories: Array<Category>;

  ngOnInit() {
    this.categoryService.getCategoriesWithNumber().subscribe(
      response => {
        this.categories = response;
      },
      error => {

      },
    );
  }

  searchWithCategory(categoryId: number) {
    this.router.navigateByUrl(`/search?category=${categoryId}`);
  }

}
