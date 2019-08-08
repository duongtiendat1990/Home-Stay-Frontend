import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private ownerResource = 'http://localhost:8080/api/owner';
  private guestResource = 'http://localhost:8080/api/guest';

  constructor(private http: HttpClient) {
  }


  publishHouse(data: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.ownerResource + '/houses', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getAllHouses(): Observable<any> {
    return this.http.get(this.guestResource + '/houses', httpOption);
  }

  getHouseInfoById(id: number): Observable<any> {
    return this.http.get(this.guestResource + '/houses' + '/' + id);
  }
}
