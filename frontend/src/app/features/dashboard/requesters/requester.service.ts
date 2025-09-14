import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {RequesterDto} from './requester.dto';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RequesterService {
  private httpClient: HttpClient = inject(HttpClient)
  private url = environment.apiUrl + '/requesters';

  getAll(): Observable<RequesterDto[]> {
    return this.httpClient.get<RequesterDto[]>(this.url);
  }
}
