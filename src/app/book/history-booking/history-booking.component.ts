import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.css']
})
export class HistoryBookingComponent implements OnInit {
  historyBooking;
  isdeleteBook;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getBookHouseByUser();
  }

  getBookHouseByUser() {
    this.bookService.getBookHouseByUser().subscribe(
      data => {
        this.historyBooking = data;
      }, error => console.log(error)
    );
  }

  getTotal(checkin: any, checkout: Date, price: any) {
    const total = (checkout.getTime() - checkin.getTime()) / (24 * 3600 * 1000);
    return total * price;
  }

  deleteBook(id: number) {
    const message = confirm('Are y sure delete this house');
    this.bookService.deleteBookHouse(id).subscribe(data => {
      console.log(data);
      this.getBookHouseByUser();
    }, error => {
      console.log(error);
      this.isdeleteBook = true;
    });
  }
}
