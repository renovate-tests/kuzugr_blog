import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateForm } from '@functions/validate-forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
})
export class SearchTextComponent implements OnInit {
  form: FormGroup;
  formErrors: {[key: string]: Array<string>} = {};
  validationMessages = {
    'keyword': {
      'required': 'キーワードを入力してください。',
      'maxlength': 'キーワードは50文字以内で入力してください。',
    },
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.router.navigateByUrl(`/search?keyword=${this.form.value['keyword']}`);
    } else {
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
    }
  }

}
