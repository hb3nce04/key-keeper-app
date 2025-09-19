import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BorrowingDto} from './borrowing.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class BorrowingService extends AbstractCrudService<BorrowingDto> {
  constructor(http: HttpClient) {
    super(http, '/borrowings');
  }
}
