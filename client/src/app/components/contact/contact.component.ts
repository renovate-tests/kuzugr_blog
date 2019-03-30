import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateForm } from '@functions/validate-forms';
import { Contact } from '@models/contact';
import { ContactService } from '@services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  contact: Contact;
  formErrors: {[key: string]: Array<string>} = {};
  validationMessages = {
    'name': {
      'required': '名前を入力してください。',
      'maxlength': '名前は50文字以内で入力してください。',
    },
    'content': {
      'required': 'お問い合わせ内容を入力してください。',
      'maxlength': 'お問い合わせ内容は5000文字以内で入力してください。',
    },
    'email': {
      'required': 'メールアドレスを入力してください。',
      'maxlength': 'メールアドレスは256文字以内で入力してください。',
      'email': '無効なメールアドレスの形式です。',
    },
  };
  isDisabled: boolean;
  gotError: boolean;
  sendSuccess: boolean;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.sendSuccess = false;
    this.isDisabled = false;
    this.gotError = false;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(256), Validators.email]),
      content: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    });
  }

  onSubmit() {
    this.isDisabled = true;
    if (this.form.valid) {
      this.contact = this.form.value;
      this.sendEmail();
    } else {
      this.isDisabled = false;
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
    }
  }

  sendEmail() {
    this.contactService.sendEmail(this.contact).subscribe(
      response => {
        if ( response['result'] === true ) {
          this.sendSuccess = true;
        }
      },
      error => {
        this.gotError = true;
      },
    );
  }

}
