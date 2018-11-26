import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeviseComponent } from './components/devise/devise.component';
import { ArticleComponent } from './components/article/article.component';
import { CreateAccountComponent } from './components/devise/account/create-account/create-account.component';
import { EditAccountComponent } from './components/devise/account/edit-account/edit-account.component';
import { LoginComponent } from './components/devise/account/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviseComponent,
    ArticleComponent,
    CreateAccountComponent,
    EditAccountComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
