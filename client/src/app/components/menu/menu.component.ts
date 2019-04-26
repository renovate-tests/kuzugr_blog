import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  loginState: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginState = false;
    this.getLoginState();
  }

  getLoginState() {
    this.authService.loginState().then(
      (response) => {
        this.loginState = response['login_state'];
      },
      (error) => {},
    );
  }
}
