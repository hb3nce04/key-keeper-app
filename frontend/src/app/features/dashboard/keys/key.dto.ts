import {RoomDto} from '../rooms/room.dto';

export interface KeyDto {
  code: string;
  room: RoomDto;
}
