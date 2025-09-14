import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {RoomDto} from './room.dto';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoomService {
  private httpClient: HttpClient = inject(HttpClient)
  private url = environment.apiUrl + '/rooms';

  getAll(): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(this.url);
  }
}
