import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {House} from '../../model/house';
import {UploadFileService} from '../../services/upload-file.service';
import {FileUpload} from '../../model/file-upload';
import {throws} from 'assert';

@Component({
  selector: 'app-publish-house',
  templateUrl: './publish-house.component.html',
  styleUrls: ['./publish-house.component.css']
})
export class PublishHouseComponent implements OnInit {
  form: any = {};
  progress: { percentage: number } = {percentage: 0};
  createHouse: House;
  isPublished = false;
  isPublishedFail = false;
  errorMessage = '';
  info: FormData = new FormData();
  images: File [] = [];
  categories = [];
  currentFileUpload: FileUpload;
  private data: FormData;

  constructor(private houseService: HouseService, private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.houseService.getCategories().subscribe(data => this.categories = data);
  }

  getFileDetail(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      this.images.push(e.target.files[i]);
    }
  }

  upload(self, resolve, reject, i) {
    self.currentFileUpload = new FileUpload(self.images[i]);
    self.uploadService.pushFileToStorage(self.currentFileUpload, self.progress, resolve, reject);
  }

  async onSubmit() {
    try {
      const urls: string[] = [];
      await this.uploadGallery(urls);
      this.createHouse = new House(
        this.form.name,
        this.form.address,
        this.form.bedRooms,
        this.form.bathRooms,
        this.form.description,
        this.form.pricePerNight,
        this.form.category,
        urls
      );
      this.data = toFormData(this.createHouse);
      this.houseService.publishHouse(this.data).subscribe(
        data => {
          console.log(data);
          this.isPublished = true;
          this.isPublishedFail = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isPublished = false;
          this.isPublishedFail = true;
        }
      );
    } catch (e) {
      console.log(e);
    }

  }

  async uploadGallery(urls) {
    const self = this;
    for (let i = 0; i < this.images.length; i++) {
      await new Promise(function (resolve, reject) {
        self.upload(self, resolve, reject, i);
      }).then(url => urls.push(url.toString()))
        .catch(error => throws(error));
    }
  }
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();
  for (const key of Object.keys(formValue)) {
    if (key === 'images') {
      for (let i = 0; i < formValue[key].length; i++) {
        formData.append(key, formValue[key][i]);
      }
    } else {
      const value = formValue[key];
      formData.append(key, value);
    }
  }

  return formData;
}
