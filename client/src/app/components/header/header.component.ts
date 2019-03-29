import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { BlogInformation } from '../../shared/models/blog-information';
import { BlogInformationService } from '../../shared/services/blog-information.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginState: boolean;
  blogInformation: BlogInformation;
  blogInformationLoaded: boolean;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private blogInformationService: BlogInformationService) { }

  ngOnInit() {
    this.blogInformationLoaded = false;
    this.getBlogInformation();
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

  getBlogInformation() {
    this.blogInformationService.getBlogInformation().subscribe(
      response => {
        this.blogInformation = response;
        this.blogInformationLoaded = true;
      },
      error => {

      },
    );
  }
}
