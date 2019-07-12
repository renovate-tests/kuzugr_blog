import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { AdvertisementComponent } from './advertisement.component';
import { SafeHtmlPipe } from '../../../shared/pipes/pipe.safehtml.pipe';

describe('AdvertisementComponent', () => {
  let component: AdvertisementComponent;
  let fixture: ComponentFixture<AdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementComponent, SafeHtmlPipe],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
