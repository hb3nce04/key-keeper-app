import {Injectable} from '@angular/core';
import {BorrowingResponseDto} from './dtos/borrowing-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class BorrowingService extends AbstractCrudService<BorrowingResponseDto> {
  constructor() {
    super('/borrowings');
  }
}
