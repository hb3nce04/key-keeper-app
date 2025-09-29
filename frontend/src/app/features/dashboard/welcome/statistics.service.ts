import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatisticsDto} from './statistics.dto';

@Injectable({providedIn: 'root'})
export class StatisticsService {
  protected httpClient = inject(HttpClient)
  private baseUrl = "/statistics"

  getStatistics(): Observable<StatisticsDto> {
    return this.httpClient.get<StatisticsDto>(environment.apiUrl + this.baseUrl);
  }
}
