import {Injectable} from '@angular/core';
import {RoomResponseDto} from './dtos/room-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class RoomService extends AbstractCrudService<RoomResponseDto> {
  constructor() {
    super('/rooms');
  }
}
