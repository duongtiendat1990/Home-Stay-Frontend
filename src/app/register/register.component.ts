import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Gender} from '../auth/gender';
import {SignUpInfo} from '../auth/signup-info';
import {Router} from '@angular/router';

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  progress = 0;
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  data: FormData = new FormData();
  fileList: FileList;
  avatar: File;
  minDate: Date = new Date(new Date().getFullYear() - 90, new Date().getMonth(), new Date().getDate());
  maxDate: Date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.fileList = event.target.files;
    this.avatar = this.fileList[0];
  }

  changeGender(isFemale: boolean) {
    this.form.gender = (isFemale) ? Gender.FEMALE : Gender.MALE;
  }

  onSubmit() {
  debugger;
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.birthday,
      this.form.gender,
      this.form.address,
      this.form.phoneNumber,
      this.form.password,
      this.avatar
    );
    this.data = toFormData(this.signupInfo);
    this.authService.signUp(this.data).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
