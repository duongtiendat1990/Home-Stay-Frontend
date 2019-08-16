import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HouseCriteria} from './model/house-criteria';
import {HouseService} from './services/house.service';
import {MessageService} from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  private avatarLink: string;
  criteria: HouseCriteria = new HouseCriteria();

  constructor(private tokenStorage: TokenStorageService, private router: ActivatedRoute,
              private houseService: HouseService, private messageService: MessageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getAvatarLink() !== '') {
        this.avatarLink = this.tokenStorage.getAvatarLink();
      }
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  search() {
    const filterKeys = Object.keys(this.criteria);
    let queryString = '';
    filterKeys.every(key => {
      if (!this.criteria[key] || (typeof this.criteria[key] === 'string' && !this.criteria[key].length)) {
        queryString += '';
        return true;
      } else {
        if (key === 'minPrice') {
          queryString += queryString === '' ? key + '\>' + this.criteria[key] : '&' + key + '\>' + this.criteria[key];
          return true;
        } else if (key === 'maxPrice') {
          queryString += queryString === '' ? key + '\<' + this.criteria[key] : '&' + key + '\<' + this.criteria[key];
          return true;
        } else {
          queryString += queryString === '' ? key + '=' + this.criteria[key] : '&' + key + '=' + this.criteria[key];
          return true;
        }
      }
    });
    this.houseService.searchHouse(queryString).subscribe(data => {
      this.messageService.sendMessage(data);
    });
  }

  // navigate(path: string){
  //   this.router.navigate('path')
  // }
}
