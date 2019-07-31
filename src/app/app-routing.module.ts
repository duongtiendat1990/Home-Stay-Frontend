import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {HomeComponent} from './home/home.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RestPasswordComponent} from './rest-password/rest-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'rest-password',
    component:  RestPasswordComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
