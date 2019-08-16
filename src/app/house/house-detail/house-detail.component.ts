import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseInfo} from '../../model/house_info';
import {HouseService} from '../../services/house-service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {BookHouse} from '../../model/book_house';
import {BookService} from '../../services/book.service';

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
  houseDetail: HouseInfo = new HouseInfo();
  errorMessage: string;
  bookForm: FormGroup;
  book: BookHouse;
  isBookHouse = false;
  invalidMessage: string;
  booked = false;
  house;
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
        this.houseDetail = data;
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
  debugger;
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


  compareTwoDates() {
    // @ts-ignore
    if (new Date(this.form.controls['date_end'].value) < new Date(this.form.controls['date_start'].value)) {
      this.error = {
        isError: true, errorMessage: 'End Date cannot before start date'
      };
    }
  }

}





