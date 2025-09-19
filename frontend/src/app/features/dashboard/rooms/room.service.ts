import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoomDto} from './room.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class RoomService extends AbstractCrudService<RoomDto> {
  constructor(http: HttpClient) {
    super(http, '/rooms');
  }
}
