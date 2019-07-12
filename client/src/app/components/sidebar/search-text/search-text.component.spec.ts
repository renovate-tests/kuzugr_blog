import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { SearchTextComponent } from './search-text.component';

describe('SearchTextComponent', () => {
  let component: SearchTextComponent;
  let fixture: ComponentFixture<SearchTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTextComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
