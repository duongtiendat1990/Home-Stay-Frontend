import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {ResetPassword} from './resetPassword';
import {ChangePassword} from './changePassword';
import {UpdateInfo} from './update-info';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = '/api/auth/signin';
  private signupUrl = '/api/auth/signup';
  private updateInfoUrl = '/api/update-info';
  private forgotPasswordUrl = '/api/auth/forgot-password';
  private resetPasswordUrl = '/api/auth/reset-password';
  private changePasswordUrl = '/api/update-password';


  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOption);
  }

  signUp(info: FormData): Observable<any> {
    return this.http.post(this.signupUrl, info);
  }

  forgotPassword(gmail: string): Observable<any> {
    return this.http.post(this.forgotPasswordUrl, gmail);
  }

  restPassword(info: ResetPassword): Observable<any> {
    return this.http.post<JwtResponse>(this.resetPasswordUrl, info, httpOption);
  }

  updateInfo(info: FormData): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.updateInfoUrl, info);
  }

  getUpdateInfoForm(): Observable<any> {
    return this.http.get(this.updateInfoUrl);
  }

  updatePassword(info: ChangePassword): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.changePasswordUrl, info, httpOption);
  }


}
