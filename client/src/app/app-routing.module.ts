import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { LoginComponent } from './components/account/login/login.component';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchArticleComponent } from './components/article/search-article/search-article.component';

const routes: Routes = [
  { path: '', component: ArticleComponent },
  { path: 'registration', component: CreateAccountComponent },
  { path: 'account', component: EditAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'article',
    children: [
      { path: 'create', component: CreateArticleComponent },
      { path: ':article_id', component: ArticleComponent },
      { path: ':article_id/edit', component: CreateArticleComponent },
    ],
  },
  { path: 'search', component: SearchArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
