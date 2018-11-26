import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './components/devise/account/create-account/create-account.component';
import { EditAccountComponent } from './components/devise/account/edit-account/edit-account.component';
import { LoginComponent } from './components/devise/account/login/login.component';

const routes: Routes = [
  { path: 'registration', component: CreateAccountComponent },
  { path: 'account', component: EditAccountComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
