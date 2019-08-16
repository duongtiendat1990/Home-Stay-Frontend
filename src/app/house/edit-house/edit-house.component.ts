import {Component, OnInit} from '@angular/core';
import {House} from '../../model/house';
import {HouseService} from '../../services/house-service';
import {ActivatedRoute, Route} from '@angular/router';
import {UpdateInfoHouse} from '../../model/update_info_house';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent implements OnInit {

  form: any = {};
  progress = 0;
  updateHouse: UpdateInfoHouse;
  isUpdateHouse = false;
  errorMessage = '';
  info: FormData = new FormData();
  images: File [] = [];
  p: any;
  isRented = false;
  houseCurrents;

  constructor(private houseService: HouseService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.houseCurrent();
  }

  getFileDetail(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      this.images.push(e.target.files[i]);
    }
  }

  houseCurrent() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.houseService.getHouse(id).subscribe(next => {
        this.houseCurrents = next;
      },
    )
    ;


  }

  onSubmit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.updateHouse = new UpdateInfoHouse(
      this.form.name,
      this.form.address,
      this.form.bedRooms,
      this.form.bathRooms,
      this.form.pricePerNight,
      this.form.category,
      this.form.isRented,
      this.form.description,
      this.images
    );

    this.info = toFormData(this.updateHouse);
    debugger;
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

