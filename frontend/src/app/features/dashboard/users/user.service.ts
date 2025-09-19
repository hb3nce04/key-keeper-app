import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDto} from './user.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class UserService extends AbstractCrudService<UserDto> {
  constructor(http: HttpClient) {
    super(http, '/users');
  }
}
