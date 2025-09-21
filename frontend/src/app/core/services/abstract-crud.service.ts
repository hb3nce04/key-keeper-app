import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {inject} from '@angular/core';
import {BaseResponseDto} from '../dtos/base-response.dto';

export abstract class AbstractCrudService<REQ, RES extends BaseResponseDto> {
  protected httpClient = inject(HttpClient)
  public data$ = new BehaviorSubject<RES[]>([]);

  protected constructor(
    protected baseUrl: string
  ) {
  }

  findAll(): Observable<RES[]> {
    if (!this.data$.getValue().length) {
      this.httpClient.get<RES[]>(environment.apiUrl + this.baseUrl).subscribe(data => this.data$.next(data));
    }
    return this.data$.asObservable();
  }

  findById(id: number): Observable<RES> {
    const found = this.data$.getValue().find(data => data.id === id);
    if (found) {
      return of(found);
    } else {
      return this.httpClient.get<RES>(`${environment.apiUrl + this.baseUrl}/${id}`);
    }
  }

  create(entity: REQ): Observable<RES> {
    return this.httpClient.post<RES>(environment.apiUrl + this.baseUrl, entity).pipe(
      tap({
        next: (data) => this.data$.next([...this.data$.getValue(), data])
      }),
    );
  }

  update(id: number, entity: REQ): Observable<RES> {
    return this.httpClient.put<RES>(`${environment.apiUrl + this.baseUrl}/${id}`, entity).pipe(
      tap({
        next: (updatedData) => {
          const currentData = this.data$.getValue();
          const index = currentData.findIndex(item => item.id === id);
          if (index !== -1) {
            currentData[index] = updatedData;
            this.data$.next([...currentData]);
          }
        }
      }),
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl + this.baseUrl}/${id}`).pipe(
      tap({
        next: () => this.data$.next(this.data$.getValue().filter(value => value.id !== id))
      })
    );
  }
}
