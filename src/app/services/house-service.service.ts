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
export class HouseServiceService {

  private readonly API_URL = 'http://localhost:8080/api/houses';


  constructor(private http: HttpClient) {
  }


  createHouse(data: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.API_URL, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getListHouseByUser(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/house');
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id);
  }

  updateHouse(id: number, house: FormData): Observable<any> {
    return this.http.put<any>(this.API_URL + '/' + id, house);
  }

  getHouse(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/' + id);

  }
}
