import {RoomType} from '../enums/room.enum';

export interface RoomRequestDto {
  code: string;
  name: string;
  floor: number;
  building: number;
  capacity: number;
  area: number;
  type: RoomType;
}
