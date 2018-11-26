import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from '../../components/layout/layout.routing';

import { ArticleComponent } from '../../components/article/article.component';
import { CreateAccountComponent } from '../../components/account/create-account/create-account.component';
import { EditAccountComponent } from '../../components/account/edit-account/edit-account.component';
import { LoginComponent } from '../../components/account/login/login.component';
import { LayoutComponent } from '../../components/layout/layout.component';

@NgModule({
  declarations: [
    ArticleComponent,
    CreateAccountComponent,
    EditAccountComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LayoutRoutingModule
  ],
  providers: []
})
export class LayoutModule { }
