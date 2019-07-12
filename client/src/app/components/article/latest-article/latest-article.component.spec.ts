import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';

import { LatestArticleComponent } from './latest-article.component';

describe('LatestArticleComponent', () => {
  let component: LatestArticleComponent;
  let fixture: ComponentFixture<LatestArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestArticleComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
