import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
})
export class SearchTextComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl(),
    });
  }

  onSubmit() {
    if (!!this.form.value['keyword']) {
      this.router.navigateByUrl(`/search?keyword=${this.form.value['keyword']}`);
    }
  }

}
