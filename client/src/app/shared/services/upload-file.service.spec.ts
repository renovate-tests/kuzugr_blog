import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { UploadFileService } from './upload-file.service';

describe('UploadFileService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: UploadFileService = TestBed.get(UploadFileService);
    expect(service).toBeTruthy();
  });
});
