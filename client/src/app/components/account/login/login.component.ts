import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateForm } from '../../../shared/functions/validate-forms';
import { SessionService } from '../session.service';
import { User } from '../../../shared//models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  gotError: boolean;
  formErrors: { [key: string]: Array<string> } = {};
  validationMessages = {
    email: {
      required: 'メールアドレスを入力してください。',
      maxlength: 'メールアドレスは100文字以内で入力してください。',
      email: '無効なメールアドレスの形式です。',
    },
    password: {
      required: 'パスワードを入力してください。',
      maxlength: 'パスワードは50文字以内で入力してください。',
    },
  };

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  onSubmit() {
    this.gotError = false;
    this.formErrors = {};
    if (this.form.valid) {
      this.user = this.form.value;

      this.sessionService.login(this.user).subscribe(
        (response) => {
          location.href = '/';
        },
        (error) => {
          this.gotError = true;
        },
      );
    } else {
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
    }
  }
}
