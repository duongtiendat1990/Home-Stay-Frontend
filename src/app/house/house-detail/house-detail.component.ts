import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../services/house.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {BookHouse} from '../../model/book_house';
import {BookService} from '../../services/book.service';
import {House} from '../../model/house';

function compareTwoDates(c: AbstractControl) {
  const v = c.value;
  return (new Date(v.checkIn) < new Date(v.checkOut) ? null : {
    validateTime: true
  });
}

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house: House = new House();
  errorMessage: string;
  bookForm: FormGroup;
  book: BookHouse;
  isBookHouse = false;
  invalidMessage: string;
  booked = false;
  total;
  authority = false;
  isRented;
  booking;
  minDate = new Date();
  error: any = {isError: false, errorMessage: ''};

  constructor(private route: ActivatedRoute, private houseService: HouseService, private fb: FormBuilder,
              private token: TokenStorageService, private bookHouseService: BookService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.houseService.getHouseInfoById(id).subscribe(
      data => {
        this.house = this.convertHouse(data);
      }, error => {
        this.errorMessage = error.error.message;
      }
    );

    this.bookForm = this.fb.group({
      checkIn: ['', [Validators.required, Validators.min(this.minDate.getTime())]],
      checkOut: ['', [Validators.required]]
    });
    if (this.token.getToken()) {
      this.authority = true;
    }
  }

  onBooking() {
    this.booking = true;
    this.invalidMessage = null;
    const id = +this.route.snapshot.paramMap.get('id');
    const {value} = this.bookForm;
    // @ts-ignore
    this.bookHouseService.bookHouse(id, value).subscribe(data => {
        console.log(data);
        this.isBookHouse = true;
        this.booked = true;
      }, error1 => {
        console.log(error1);
        this.booked = false;
      }
    );


  }
  private convertHouse(data) {
    const house: House = new House();
    for (const key of Object.keys(data)) {
      if (key === 'category') {
        house[key] = data[key].name;
      } else if (key === 'images') {
        house[key] = this.getImageUrl(data, key);
        console.log('foo');
      } else {
        house[key] = data[key];
      }
    }
    return house;
  }

  private getImageUrl(data, key) {
    const images = [data[key].length];
    for (let i = 0; i < data[key].length; i++) {
      images[i] = (data[key][i].imageUrl);
    }
    return images;
  }

  compareTwoDates() {
    // @ts-ignore
    if (new Date(this.form.controls['date_end'].value) < new Date(this.form.controls['date_start'].value)) {
      this.error = {
        isError: true, errorMessage: 'End Date cannot before start date'
      };
    }
  }

}





