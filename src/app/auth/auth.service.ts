import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {ResetPassword} from './resetPassword';
import {ChangePassword} from './changePassword';
import {FormGroup} from '@angular/forms';
import {House} from './house';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private updateInfoUrl = 'http://localhost:8080/api/update-info';
  private forgotPasswordUrl = 'http://localhost:8080/api/auth/forgot-password';
  private resetPasswordUrl = 'http://localhost:8080/api/auth/reset-password';
  private changePasswordUrl = 'http://localhost:8080/api/update-password';
  private createHouseUrl = 'http://localhost:8080/api/create-house';


  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOption);
  }

  signUp(info: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.signupUrl, info, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
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

  updatePassword(info: ChangePassword): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.changePasswordUrl, info, httpOption);
  }

  createHouse(data: FormData): Observable<JwtResponse> {
  debugger;

    const jwtResponseObservable = this.http.post<JwtResponse>(this.createHouseUrl, data);
    return jwtResponseObservable;

  }
}
