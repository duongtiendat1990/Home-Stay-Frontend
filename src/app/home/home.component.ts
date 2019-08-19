import {Component, OnInit} from '@angular/core';
import {HouseService} from '../services/house.service';
import {HouseCriteria} from '../model/house-criteria';
import {Subscription} from 'rxjs';
import {MessageService} from '../services/message.service';
import {House} from '../model/house';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: House[];
  criteria: HouseCriteria = new HouseCriteria();
  subscription: Subscription;

  constructor(private houseService: HouseService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(data => {
      if (data) {
        const houses: House[] = [data.length];
        for (let i = 0; i < data.length; i++) {
          houses[i] = (this.convertHouse(data[i]));
        }
        this.houses = houses;
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.houseService.getAllHouses().subscribe(res => {
      this.houses = [res.length];
      for (let i = 0; i < res.length; i++) {
        this.houses[i] = this.convertHouse(res[i]);
      }
    });
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
}
