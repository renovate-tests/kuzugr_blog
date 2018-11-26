import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionService } from '../../session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  apiEndpoint = 'http://localhost:3000';

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.user = this.form.value;

      this.http.post<User>(`${this.apiEndpoint}/users/sign_in`, { user: user } );
      //this.sessionService.login(this.user).subscribe(response => {});
      //this.sessionService.loginFlag.subscribe(
      //  flag => {
      //    this.userService.currentUser().subscribe(
      //      response => {
      //        const currentUser = response['user'];
      //        console.log(currentUser);
      //      }
      //  }
      //);
    }
  }

}
