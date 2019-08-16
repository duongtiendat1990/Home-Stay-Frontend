import {Component, OnInit} from '@angular/core';
import {HouseInfo} from '../model/house-info';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../services/house.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  houseDetail: HouseInfo = new HouseInfo();
  errorMessage: string;

  constructor(private route: ActivatedRoute, private houseService: HouseService) {
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
  }
}
