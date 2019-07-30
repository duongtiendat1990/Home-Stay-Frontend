import { Component, OnInit } from '@angular/core';
import {UpdateInfo} from '../auth/update-info';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  form: any = {};
  progress = 0;
  updateInfo: UpdateInfo;
  isUpdated = false;
  isUpdateFailed = false;
  errorMessage = '';
  data: FormData = new FormData();
  fileList: FileList;
  avatar: File;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.fileList = event.target.files;
    this.avatar = this.fileList[0];
  }
  onSubmit() {
    this.updateInfo = new UpdateInfo(
      this.form.name,
      this.form.email,
      this.avatar
    );
    this.data = toFormData(this.updateInfo);
    this.authService.updateInfo(this.data).subscribe(
      data => {
        console.log(data);
        this.isUpdated = true;
        this.isUpdateFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isUpdateFailed = true;
      }
    );
  }
}

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
