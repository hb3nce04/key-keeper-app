import {Injectable} from '@angular/core';
import {RoomResponseDto} from './dtos/room-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {RoomRequestDto} from './dtos/room-request.dto';

@Injectable({providedIn: 'root'})
export class RoomService extends AbstractCrudService<RoomRequestDto, RoomResponseDto> {
  constructor() {
    super('/rooms');
  }
}
