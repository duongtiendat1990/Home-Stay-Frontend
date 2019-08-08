import {Component, OnInit} from '@angular/core';
import {HouseInfo} from '../model/house-info';
import {HouseService} from '../services/house.service';
import {Observable, Subscription} from 'rxjs';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: HouseInfo[];

  constructor(private houseService: HouseService) {
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.houseService.getAllHouses().subscribe(res => {
      this.houses = res;
    });
  }
}
