import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';

import { MonthlyArchiveComponent } from './monthly-archive.component';

describe('MonthlyArchiveComponent', () => {
  let component: MonthlyArchiveComponent;
  let fixture: ComponentFixture<MonthlyArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyArchiveComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
