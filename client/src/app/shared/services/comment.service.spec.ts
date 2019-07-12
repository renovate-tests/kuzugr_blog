import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });
});
