import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HouseInfo} from '../model/house-info';
import {HouseService} from '../services/house.service';
import {HouseCriteria} from '../model/house-criteria';
import {Subscription} from 'rxjs';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  houses: HouseInfo[];
  criteria: HouseCriteria = new HouseCriteria();
  subscription: Subscription;

  constructor(private houseService: HouseService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(data => {
      if (data) {
        this.houses = data;
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.houseService.getAllHouses().subscribe(res => {
      this.houses = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
