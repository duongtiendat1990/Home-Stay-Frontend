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

  private createHouseUrl = 'http://localhost:8080/api/publish-house';


  constructor(private http: HttpClient) {
  }


  createHouse(data: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.createHouseUrl, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
