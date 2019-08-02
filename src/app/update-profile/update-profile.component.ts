import { Component, OnInit } from '@angular/core';
import {UpdateInfo} from '../auth/update-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Gender} from '../auth/gender';

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
  minDate: Date = new Date(new Date().getFullYear() - 90, new Date().getMonth(), new Date().getDate());
  maxDate: Date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
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
    this.updateInfo = new UpdateInfo(
      this.form.name,
      this.form.birthday,
      this.form.gender,
      this.form.address,
      this.form.phoneNumber,
      this.avatar
    );
    this.data = toFormData(this.updateInfo);
    this.authService.updateInfo(this.data).subscribe(
      data => {
        console.log(data);
        this.isUpdated = true;
        this.isUpdateFailed = false;
        this.tokenStorage.saveAvatarLink(data.avatarLink);
        window.location.reload();
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
