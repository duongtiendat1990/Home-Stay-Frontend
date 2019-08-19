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
        this.house = data;
      }, error => {
        this.errorMessage = error.error.message;
      }
    );
  }

}
