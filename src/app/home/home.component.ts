import { Component, OnInit } from '@angular/core';
import {HouseInfo} from '../model/house_info';
import {HouseService} from '../services/house-service';

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
