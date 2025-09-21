import {Injectable} from '@angular/core';
import {UserResponseDto} from './dtos/user-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {UserRequestDto} from './dtos/user-request.dto';

@Injectable({providedIn: 'root'})
export class UserService extends AbstractCrudService<UserRequestDto, UserResponseDto> {
  constructor() {
    super('/users');
  }
}
