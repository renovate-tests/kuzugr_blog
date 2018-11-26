import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionService } from '../../session.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    console.log('1');
    if (this.form.valid) {
      console.log('2');
      this.user = this.form.value;
      // this.sessionService.login(this.user);
      this.sessionService.login(this.user).subscribe(
        response => {
          console.log('3');
          console.log(response);
        }
      );
    }
  }

}
