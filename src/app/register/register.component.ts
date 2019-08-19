import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Gender} from '../auth/gender';
import {SignUpInfo} from '../auth/signup-info';
import {Router} from '@angular/router';
import {FileUpload} from '../model/file-upload';
import {UploadFileService} from '../services/upload-file.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  progress: { percentage: number } = {percentage: 0};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  data: FormData = new FormData();
  fileList: FileList;
  avatar: File;
  minDate: Date = new Date(new Date().getFullYear() - 90, new Date().getMonth(), new Date().getDate());
  maxDate: Date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  currentFileUpload: FileUpload;

  constructor(private authService: AuthService, private uploadService: UploadFileService) {
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

  upload(self, resolve, reject) {
    self.currentFileUpload = new FileUpload(self.avatar);
    self.uploadService.pushFileToStorage(self.currentFileUpload, self.progress, resolve, reject);
  }

  onSubmit() {
    const self = this;
    const promise = new Promise(function (resolve, reject) {
      self.upload(self, resolve, reject);
    });
    promise.then(url => {
      this.signupInfo = new SignUpInfo(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.birthday,
        this.form.gender,
        this.form.address,
        this.form.phoneNumber,
        this.form.password,
        url.toString()
      );
      this.data = toFormData(this.signupInfo);
      this.authService.signUp(this.data).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    });
    promise.catch(error => {
      console.log(error);
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
    });
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
