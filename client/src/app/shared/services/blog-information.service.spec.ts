import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { BlogInformationService } from './blog-information.service';

describe('BlogInformationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: BlogInformationService = TestBed.get(BlogInformationService);
    expect(service).toBeTruthy();
  });
});
