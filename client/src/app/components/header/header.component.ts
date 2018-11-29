import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login_state: boolean;

  constructor(private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.login_state  = false;
    const loginEmail = this.cookieService.get('login_email');
    if (!!loginEmail) {
      this.login_state = this.authService.loginState().then(
        response => {
          this.login_state = response['login_state'];
        }
      );
    }
  }

  loginState() {
    return this.login_state === true;
  }

}
