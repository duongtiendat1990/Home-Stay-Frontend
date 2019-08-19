import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookHouse} from '../model/book_house';
// @ts-ignore
import {SearchBookHouse} from '../model/search_book_house';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private API_URL = '/api/book';

  constructor(private http: HttpClient) {
  }

  bookHouse(id: number, data: BookHouse): Observable<BookHouse> {
    return this.http.post<BookHouse>(this.API_URL + '/' + id, data);
  }

  getBookHouseByUser(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  deleteBookHouse(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id);
  }

  getBookHouse(data: string): Observable<any> {
    return this.http.get(this.API_URL + '/' + 'owner/' + data);
  }
}
