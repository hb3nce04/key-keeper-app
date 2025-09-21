import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {RequesterResponseDto} from './dtos/requester.response.dto';
import {RequesterRequestDto} from './dtos/requester-request.dto';

@Injectable({providedIn: 'root'})
export class RequesterService extends AbstractCrudService<RequesterRequestDto, RequesterResponseDto> {
  constructor() {
    super('/requesters');
  }
}
