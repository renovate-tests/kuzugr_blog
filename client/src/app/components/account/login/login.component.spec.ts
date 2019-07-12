import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validations', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('have email be required', () => {
      const email = component.form.controls['email'];

      email.setValue('');
      expect(email.invalid && email.hasError('required')).toBeTruthy();
    });
  });
});
