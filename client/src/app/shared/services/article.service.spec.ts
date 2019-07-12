import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });
});
