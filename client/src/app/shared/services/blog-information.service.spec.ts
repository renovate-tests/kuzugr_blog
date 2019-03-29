import { TestBed } from '@angular/core/testing';

import { BlogInformationService } from './blog-information.service';

describe('BlogInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogInformationService = TestBed.get(BlogInformationService);
    expect(service).toBeTruthy();
  });
});
