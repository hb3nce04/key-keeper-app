import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {KeyResponseDto} from './dtos/key-response.dto';

@Injectable({providedIn: 'root'})
export class KeyService extends AbstractCrudService<KeyResponseDto>{
  constructor() {
    super('/keys');
  }
}
