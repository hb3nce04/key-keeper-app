import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequesterDto} from './requester.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class RequesterService extends AbstractCrudService<RequesterDto> {
  constructor(http: HttpClient) {
    super(http, '/requesters');
  }
}
