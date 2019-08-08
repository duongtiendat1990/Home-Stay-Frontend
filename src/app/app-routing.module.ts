import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {HomeComponent} from './home/home.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RestPasswordComponent} from './rest-password/rest-password.component';
import {RegisterComponent} from './register/register.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {PublishHouseComponent} from './house/publish-house/publish-house.component';
import {EditHouseComponent} from './house/edit-house/edit-house.component';
import {ListHouseByUserComponent} from './house/list-house-by-user/list-house-by-user.component';
import {DetailHouseComponent} from './house/detail-house/detail-house.component';

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
    path: 'signup',
    component: RegisterComponent,
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
    component: RestPasswordComponent
  },
  {
    path: 'house',
    component: PublishHouseComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'house/edit/:name/:id',
    component: EditHouseComponent
  },
  {
    path: 'houses',
    component: ListHouseByUserComponent
  },
  {
    path: 'house/detail/:id',
    component: DetailHouseComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
