import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });
});
