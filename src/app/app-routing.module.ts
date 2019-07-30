import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RestPasswordComponent} from './rest-password/rest-password.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
  {
    path: 'rest-password',
    component:  RestPasswordComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
