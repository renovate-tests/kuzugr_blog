import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { ThumbnailService } from './thumbnail.service';

describe('ThumbnailService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: ThumbnailService = TestBed.get(ThumbnailService);
    expect(service).toBeTruthy();
  });
});
