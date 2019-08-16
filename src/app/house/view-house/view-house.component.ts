import { Component, OnInit } from '@angular/core';
import {HouseInfo} from '../../model/house_info';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../services/house-service';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {

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
