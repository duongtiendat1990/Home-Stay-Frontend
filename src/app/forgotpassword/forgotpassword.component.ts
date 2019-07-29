import { Component, OnInit } from '@angular/core';

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
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent  {
//   form: any = {};
//   progress = 0;
//   signupInfo: SignUpInfo;
//   isSignedUp = false;
//   isSignUpFailed = false;
//   errorMessage = '';
//   data: FormData = new FormData();
//   constructor(private authService: AuthService) {
//   }
//
//   ngOnInit() {
//   }
//
//   fileChange(event) {
//     this.fileList = event.target.files;
//     this.avatar = this.fileList[0];
//   }
//   onSubmit() {
//     this.signupInfo = new SignUpInfo(
//       this.form.name,
//       this.form.username,
//       this.form.email,
//       this.form.password,
//       this.avatar
//     );
//     this.data = toFormData(this.signupInfo);
//     this.authService.signUp(this.data).subscribe(
//       data => {
//         console.log(data);
//         this.isSignedUp = true;
//         this.isSignUpFailed = false;
//       },
//       error => {
//         console.log(error);
//         this.errorMessage = error.error.message;
//         this.isSignUpFailed = true;
//       }
//     );
//   }
// }
//
// export function toFormData<T>( formValue: T ) {
//   const formData = new FormData();
//
//   for ( const key of Object.keys(formValue) ) {
//     const value = formValue[key];
//     formData.append(key, value);
//   }
//
//   return formData;
}
