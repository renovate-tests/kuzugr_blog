import { TestBed } from '@angular/core/testing';

import { CategoryServiceService } from './category.service';

describe('CategoryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryServiceService = TestBed.get(CategoryServiceService);
    expect(service).toBeTruthy();
  });
});
