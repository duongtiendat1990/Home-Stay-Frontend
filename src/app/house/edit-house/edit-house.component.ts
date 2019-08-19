import {Component, OnInit} from '@angular/core';
import {House} from '../../model/house';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Route} from '@angular/router';
import {FileUpload} from '../../model/file-upload';
import {throws} from 'assert';
import {UploadFileService} from '../../services/upload-file.service';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent implements OnInit {

  form: any = {};
  progress: { percentage: number } = {percentage: 0};
  house: House = new House();
  isUpdateHouse = false;
  errorMessage = '';
  info: FormData = new FormData();
  images: File [] = [];
  isRented = false;
  categories = [];
  isChangedImages: boolean;

  constructor(private houseService: HouseService, private route: ActivatedRoute, private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.houseCurrent();
    this.houseService.getCategories().subscribe(data => this.categories = data);
  }

  getFileDetail(e) {
    this.isChangedImages = true;
    for (let i = 0; i < e.target.files.length; i++) {
      this.images.push(e.target.files[i]);
    }
  }

  upload(self, resolve, reject, i) {
    self.currentFileUpload = new FileUpload(self.images[i]);
    self.uploadService.pushFileToStorage(self.currentFileUpload, self.progress, resolve, reject);
  }

  houseCurrent() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.houseService.getHouse(id).subscribe(next => {
        this.house = next;
      },
    );
  }

  async onSubmit() {
    try {
      const id = +this.route.snapshot.paramMap.get('id');
      if (this.isChangedImages) {
        const urls: string[] = [];
        await this.uploadGallery(urls);
        this.house.images = urls;
      }
      this.info = toFormData(this.house);
      this.houseService.updateHouse(id, this.info).subscribe(
        data => {
          console.log(data);
          this.isUpdateHouse = true;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isUpdateHouse = false;
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
      }).then(url => urls.push(url.toString()));
    }
  }

  selectCategory(value) {
    this.house.category = value;
    // this.house.category = event.target.;
  }
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();
  for (const key of Object.keys(formValue)) {
    if (key === 'images') {
      for (let i = 0; i < formValue[key].length; i++) {
        formData.append(key, formValue[key][i]);
      }
    } else if (key === 'owner') {
    } else {
      const value = formValue[key];
      formData.append(key, value);
    }
  }

  return formData;

}

