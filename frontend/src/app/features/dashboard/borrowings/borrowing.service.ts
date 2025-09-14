import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BorrowingDto} from './borrowing.dto';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BorrowingService {
  private httpClient: HttpClient = inject(HttpClient)
  private url = environment.apiUrl + '/borrowings';

  getAll(): Observable<BorrowingDto[]> {
    return this.httpClient.get<BorrowingDto[]>(this.url);
  }
}
