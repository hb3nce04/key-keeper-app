import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {RequesterResponseDto} from './dtos/requester.response.dto';

@Injectable({providedIn: 'root'})
export class RequesterService extends AbstractCrudService<RequesterResponseDto> {
  constructor() {
    super('/requesters');
  }
}
