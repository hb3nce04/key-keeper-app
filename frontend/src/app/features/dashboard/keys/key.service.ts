import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {KeyResponseDto} from './dtos/key-response.dto';
import {KeyRequestDto} from './dtos/key-request.dto';

@Injectable({providedIn: 'root'})
export class KeyService extends AbstractCrudService<KeyRequestDto, KeyResponseDto>{
  constructor() {
    super('/keys');
  }
}
