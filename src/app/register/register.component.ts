import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {SignUpInfo} from '../auth/signup-info';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
    map(( res: HttpResponse<T> ) => res.body)
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
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    debugger;
    this.fileList = event.target.files;
  }
  onSubmit() {
    // debugger;
    // console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      );
    this.avatar = this.fileList[0];
    this.data.append('signUpRequest', new Blob([JSON.stringify(this.signupInfo)],
      {
                type: 'application/json'
              }));
    this.data.append('avatar', this.avatar, this.form.name);
    this.authService.signUp(this.data).pipe(
      uploadProgress(progress => (this.progress = progress)),
      toResponseBody()
    ).subscribe(res => {
      this.progress = 0;
      this.isSignedUp = true;
      this.signupInfo = null;
    });
  }
}

// export function toFormData<T>( formValue: T ) {
//   const formData = new FormData();
//
//   for ( const key of Object.keys(formValue) ) {
//     const value = formValue[key];
//     formData.append(key, value);
//   }
//
//   return formData;
// }
