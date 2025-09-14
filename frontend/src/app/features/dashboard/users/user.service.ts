import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {UserDto} from './user.dto';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient)
  private url = environment.apiUrl + '/users';

  getAll(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.url);
  }
}
