import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { SessionService } from './session.service';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  });
});
