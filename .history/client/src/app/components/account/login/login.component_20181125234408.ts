import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionService } from '../session.service';
import { User } from 'src/app/shared/models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(private sessionService: SessionService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.user = this.form.value;

      this.sessionService.login(this.user).subscribe(
        data => {
          this.cookieService.set( 'login_email', data['email'] );
          this.cookieService.set( 'access_token', data['access_token'] );
        },
        error => {
          // エラーメッセージを出す
        }
      );
    }
  }
}
