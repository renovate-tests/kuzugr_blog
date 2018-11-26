import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { LoginComponent } from './components/account/login/login.component';
import { ArticleComponent } from './components/article/article.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: '', loadChildren: './components/layout/layout.module#LaoyutModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
