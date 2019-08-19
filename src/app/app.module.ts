import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HouseFilterPipe } from './house-filter.pipe';
import { PublishHouseComponent } from './house/publish-house/publish-house.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { EditHouseComponent } from './house/edit-house/edit-house.component';
import { ListHouseByUserComponent } from './house/list-house-by-user/list-house-by-user.component';
import { HouseDetailComponent } from './house/house-detail/house-detail.component';
import { ViewHouseComponent } from './house/view-house/view-house.component';
import { HistoryBookingComponent } from './book/history-booking/history-booking.component';
import { HostManagementComponent } from './host-management/host-management.component';
import { RentScheduleComponent } from './house/rent-schedule/rent-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    UserMenuComponent,
    AdminComponent,
    PmComponent,
    UpdateProfileComponent,
    HomeComponent,
    ForgotPasswordComponent,
    RestPasswordComponent,
    UserMenuComponent,
    ChangePasswordComponent,
    PublishHouseComponent,
    EditHouseComponent,
    ListHouseByUserComponent,
    HouseDetailComponent,
    ViewHouseComponent,
    HistoryBookingComponent,
    HostManagementComponent,
    RentScheduleComponent,
    HouseDetailComponent,
    HouseFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // for database
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
