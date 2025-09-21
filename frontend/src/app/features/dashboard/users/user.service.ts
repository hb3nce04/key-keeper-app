import {Injectable} from '@angular/core';
import {UserResponseDto} from './dtos/user-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class UserService extends AbstractCrudService<UserResponseDto> {
  constructor() {
    super('/users');
  }
}
