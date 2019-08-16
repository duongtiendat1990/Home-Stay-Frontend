import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house-service';
import {House} from '../../model/house';

@Component({
  selector: 'app-list-house-by-user',
  templateUrl: './list-house-by-user.component.html',
  styleUrls: ['./list-house-by-user.component.css']
})
export class ListHouseByUserComponent implements OnInit {
  listHouse;
  filter: any;
  p: any;


  constructor(private  houseService: HouseService) {
  }

  ngOnInit() {
    this.updateListHouse();
  }

  updateListHouse() {
    this.houseService.getListHouseByUser()
      .subscribe(next => this.listHouse = next, err => console.log(err));
  }

  deleteHouse(id: number) {
    const message = confirm('Are y sure delete this house');
    this.houseService.deleteHouse(id).subscribe(data => {
      console.log(data);
      this.updateListHouse();
    }, error => console.log(error));
  }
}
