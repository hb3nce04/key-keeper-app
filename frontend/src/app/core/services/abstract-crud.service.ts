import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export abstract class AbstractCrudService<T> {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(environment.apiUrl+this.baseUrl);
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl+this.baseUrl}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(environment.apiUrl+this.baseUrl, entity);
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl+this.baseUrl}/${id}`, entity);
  }

  patch(id: number, partial: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${environment.apiUrl+this.baseUrl}/${id}`, partial);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl+this.baseUrl}/${id}`);
  }
}
