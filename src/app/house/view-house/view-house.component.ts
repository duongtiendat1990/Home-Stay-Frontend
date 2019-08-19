import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../services/house.service';
import {House} from '../../model/house';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {

  house: House = new House();
  errorMessage: string;

  constructor(private route: ActivatedRoute, private houseService: HouseService) {
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
