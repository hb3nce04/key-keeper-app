import {Injectable} from '@angular/core';
import {BorrowingResponseDto} from './dtos/borrowing-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {BorrowingRequestDto} from './dtos/borrowing-request.dto';
import {CreateBorrowingRequestDto} from './dtos/create-borrowing-request.dto';
import {ReturnBorrowingRequestDto} from './dtos/return-borrowing-request.dto';
import {KeyStatus} from '../keys/enums/key.enum';

@Injectable({providedIn: 'root'})
export class BorrowingService extends AbstractCrudService<BorrowingRequestDto, BorrowingResponseDto> {
  constructor() {
    super('/borrowings');
  }

  returnBack(entity: ReturnBorrowingRequestDto) {
    return this.httpClient.patch<KeyStatus>(environment.apiUrl + this.baseUrl + "/return", entity);
  }

  register(entity: CreateBorrowingRequestDto) {
    return this.httpClient.post<BorrowingResponseDto>(environment.apiUrl + this.baseUrl + "/register", entity);
  }

  override create(entity: BorrowingRequestDto): Observable<BorrowingResponseDto> {
    return this.httpClient.post<BorrowingResponseDto>(environment.apiUrl + this.baseUrl, entity).pipe(
      tap({
        next: (data) => {
          this.data$.next([...this.data$.getValue(), data])
        }
      }),
    );
  }
}
