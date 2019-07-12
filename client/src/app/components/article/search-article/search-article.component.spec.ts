import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';

import { SearchArticleComponent } from './search-article.component';

describe('SearchArticleComponent', () => {
  let component: SearchArticleComponent;
  let fixture: ComponentFixture<SearchArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchArticleComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
