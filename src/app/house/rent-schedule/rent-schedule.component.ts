import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {ActivatedRoute} from '@angular/router';
import {SearchBookHouse} from '../../model/search_book_house';

@Component({
  selector: 'app-rent-schedule',
  templateUrl: './rent-schedule.component.html',
  styleUrls: ['./rent-schedule.component.css']
})
export class RentScheduleComponent implements OnInit {
  bookHouse: SearchBookHouse;
  filter: any;
  p: any;

  constructor(private bookHouseService: BookService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('name');
  debugger;
    this.bookHouseService.getBookHouse(data).subscribe(info => {
        this.bookHouse = info;
        console.log(info);
      },
      error => console.log(error));
  }

}
