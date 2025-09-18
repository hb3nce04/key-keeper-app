import {RoomDto} from '../rooms/room.dto';
import {BaseDto} from '../../../core/dtos/base.dto';

export interface KeyDto extends BaseDto {
  code: string;
  room: RoomDto;
}
