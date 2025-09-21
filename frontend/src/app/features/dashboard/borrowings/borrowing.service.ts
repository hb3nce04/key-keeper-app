import {Injectable} from '@angular/core';
import {BorrowingResponseDto} from './dtos/borrowing-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {BorrowingRequestDto} from './dtos/borrowing-request.dto';

@Injectable({providedIn: 'root'})
export class BorrowingService extends AbstractCrudService<BorrowingRequestDto, BorrowingResponseDto> {
  constructor() {
    super('/borrowings');
  }

  findByKeyCode(code: string): Observable<BorrowingResponseDto> {
    const found = this.data$.getValue().find(data => data.key.code === code);
    if (found) {
      return of(found);
    } else {
      return this.httpClient.get<BorrowingResponseDto>(`${environment.apiUrl + this.baseUrl}/by-key/${code}`);
    }
  }
}
