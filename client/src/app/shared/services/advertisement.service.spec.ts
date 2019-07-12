import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { AdvertisementService } from './advertisement.service';

describe('AdvertisementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: AdvertisementService = TestBed.get(AdvertisementService);
    expect(service).toBeTruthy();
  });
});
