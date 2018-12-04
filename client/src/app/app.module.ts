import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { HttpsInterceptor } from './shared/services/http.interceptor';

import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { LoginComponent } from './components/account/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { MenuComponent } from './components/menu/menu.component';
import { LatestArticleComponent } from './components/article/latest-article/latest-article.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ArticleComponent,
    CreateAccountComponent,
    EditAccountComponent,
    LoginComponent,
    CreateArticleComponent,
    MenuComponent,
    LatestArticleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
