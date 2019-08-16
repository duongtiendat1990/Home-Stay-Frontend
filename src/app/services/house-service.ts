import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from '../auth/jwt-response';


const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private readonly API_URL = 'http://localhost:8080/api/houses';
  private ownerResource = 'http://localhost:8080/api/owner';
  private guestResource = 'http://localhost:8080/api/guest';
  constructor(private http: HttpClient) {
  }


  createHouse(data: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.ownerResource, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
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
  getHouseInfoById(id: number): Observable<any> {
    return this.http.get(this.guestResource + '/houses' + '/' + id);
  }
  getAllHouses(): Observable<any> {
    return this.http.get(this.guestResource + '/houses', httpOption);
  }
}
