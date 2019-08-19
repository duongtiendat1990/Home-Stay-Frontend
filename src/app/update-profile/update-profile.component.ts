import {Component, OnInit} from '@angular/core';
import {UpdateInfo} from '../auth/update-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Gender} from '../auth/gender';
import {UploadFileService} from '../services/upload-file.service';
import {FileUpload} from '../model/file-upload';
import {stringify} from 'querystring';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  progress: { percentage: number } = {percentage: 0};
  form: any = {};
  updateInfo: UpdateInfo = new UpdateInfo();
  isUpdated = false;
  isUpdateFailed = false;
  errorMessage = '';
  data: FormData = new FormData();
  fileList: FileList;
  isChangedAvatar: boolean;
  avatar: File;
  minDate: Date = new Date(new Date().getFullYear() - 90, new Date().getMonth(), new Date().getDate());
  maxDate: Date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  currentFileUpload: FileUpload;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.authService.getUpdateInfoForm().subscribe(data => this.updateInfo = data);
  }

  fileChange(event) {
    this.fileList = event.target.files;
    this.avatar = this.fileList[0];
    this.isChangedAvatar = true;
  }

  changeGender(isFemale: boolean) {
    this.form.gender = (isFemale) ? Gender.FEMALE : Gender.MALE;
  }

  upload(self, resolve, reject) {
    self.currentFileUpload = new FileUpload(self.avatar);
    self.uploadService.pushFileToStorage(self.currentFileUpload, self.progress, resolve, reject);
  }

  onSubmit() {
    if (this.isChangedAvatar) {
      const self = this;
      const promise = new Promise(function (resolve, reject) {
        self.upload(self, resolve, reject);
      });
      promise.then(url => {
        this.updateInfo.avatarUrl = url.toString();
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
      });
      promise.catch(error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isUpdateFailed = true;
      });
    } else {
      this.data = toFormData(this.updateInfo);
      this.authService.updateInfo(this.data).subscribe(
        data => {
          console.log(data);
          this.isUpdated = true;
          this.isUpdateFailed = false;
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
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
