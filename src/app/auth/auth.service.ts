import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private  updateInfoUrl = 'http://localhost:8080/api/auth/update-info'
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
  updateInfo(info: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('PUT', this.updateInfoUrl, info, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
