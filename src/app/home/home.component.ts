import { Component, OnInit } from '@angular/core';
import {HouseInfo} from '../model/house-info';
import {HouseService} from '../services/house.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: Observable<HouseInfo[]>;
  subscription: Subscription;
  constructor(private houseService: HouseService) { }

  ngOnInit() {
    debugger;
    this.loadData();
  }

  loadData() {
    this.houses = this.houseService.getAllHouses();
    debugger;
  }
}
