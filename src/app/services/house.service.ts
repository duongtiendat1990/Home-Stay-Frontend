import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../model/house';


const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private ownerResource = '/api/owner';
  private guestResource = '/api/guest';

  constructor(private http: HttpClient) {
  }


  publishHouse(data: FormData): Observable<any> {
    return this.http.post(this.ownerResource + '/houses', data);
  }

  getAllHouses(): Observable<any> {
    return this.http.get(this.guestResource + '/houses', httpOption);
  }

  searchHouse(queryString: string): Observable<any> {
    return this.http.get(this.guestResource + '/houses/search?' + queryString, httpOption);
  }

  getHouseInfoById(id: number): Observable<any> {
    return this.http.get(this.guestResource + '/houses' + '/' + id);
  }

  getListHouseByUser(): Observable<any> {
    return this.http.get<any>(this.ownerResource + '/house');
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete(this.ownerResource + '/' + id);
  }

  updateHouse(id: number, house: FormData): Observable<any> {
    return this.http.put<any>(this.ownerResource + '/' + id, house);
  }

  getHouse(id: number): Observable<any> {
    return this.http.get<any>(this.ownerResource + '/' + id);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.ownerResource + '/categories');
  }
}
