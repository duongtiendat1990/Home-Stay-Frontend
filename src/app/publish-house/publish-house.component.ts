import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {House} from '../model/house';
import {HouseServiceService} from '../services/house-service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-publish-house',
  templateUrl: './publish-house.component.html',
  styleUrls: ['./publish-house.component.css']
})
export class PublishHouseComponent implements OnInit {
  form: any = {};
  progress = 0;
  createHouse: House;
  isPublished = false;
  errorMessage = '';
  info: FormData = new FormData();
  fileList: FileList;
  images: File [] = [];

  constructor(private authService: HouseServiceService) {
  }

  ngOnInit() {
  }

  getFileDetail(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      this.images.push(e.target.files[i]);
    }
  }


  onSubmit() {
    this.createHouse = new House(
      this.form.name,
      this.form.address,
      this.form.bathRooms,
      this.form.bedRooms,
      this.form.pricePerNight,
      this.form.category,
      this.form.description,
      this.images
    );
    this.info = toFormData(this.createHouse);
  debugger;
    this.authService.createHouse(this.info).subscribe(
      data => {
        console.log(data);
        this.isPublished = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isPublished = false;
      }
    );
  }
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();
debugger;
  for (const key of Object.keys(formValue)) {
    if (key === 'images') {
      for (let i = 0; i < formValue[key].length ; i++) {
        formData.append(key, formValue[key][i]);
      }
    } else {
      const value = formValue[key];
      formData.append(key, value);
    }
  }

  return formData;

}
