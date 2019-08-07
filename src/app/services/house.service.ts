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

  private housesResource = 'http://localhost:8080/api/houses';


  constructor(private http: HttpClient) {
  }


  publishHouse(data: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.housesResource, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getAllHouses(): Observable<any> {
    return this.http.get(this.housesResource, httpOption);
}
}
