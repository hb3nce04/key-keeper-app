import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {KeyDto} from './key.dto';

@Injectable({providedIn: 'root'})
export class KeyService {
  private httpClient: HttpClient = inject(HttpClient)
  private url = environment.apiUrl + '/keys';

  getAll(): Observable<KeyDto[]> {
    return this.httpClient.get<KeyDto[]>(this.url);
  }
}
