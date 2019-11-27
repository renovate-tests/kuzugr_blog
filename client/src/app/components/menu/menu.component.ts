import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateForm } from '../../shared/functions/validate-forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  loginState: boolean;
  form: FormGroup;
  formErrors: { [key: string]: Array<string> } = {};
  validationMessages = {
    keyword: {
      required: 'キーワードを入力してください。',
      maxlength: 'キーワードは50文字以内で入力してください。',
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginState = false;
    this.getLoginState();
    this.form = new FormGroup({
      keyword: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  getLoginState() {
    this.authService.loginState().then(
      (response) => {
        this.loginState = response['login_state'];
      },
      (error) => {},
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.formErrors = {};
      this.router.navigateByUrl(`/search?keyword=${encodeURIComponent(this.form.value['keyword'])}#top`);
    } else {
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
    }
  }
}
