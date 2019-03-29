import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginState: boolean;

  constructor(private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.loginState  = false;
    const loginEmail = this.cookieService.get('login_email');
    if (!!loginEmail) {
      this.loginState = this.authService.loginState().then(
        response => {
          this.loginState = response['login_state'];
        },
      );
    }
  }
}
