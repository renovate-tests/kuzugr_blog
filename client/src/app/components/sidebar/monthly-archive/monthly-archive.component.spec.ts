import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyArchiveComponent } from './monthly-archive.component';

describe('MonthlyArchiveComponent', () => {
  let component: MonthlyArchiveComponent;
  let fixture: ComponentFixture<MonthlyArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyArchiveComponent ]
    })
    .compileComponents();
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
