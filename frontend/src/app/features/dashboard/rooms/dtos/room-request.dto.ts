import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {RoomType} from '../enums/room.enum';

export interface RoomResponseDto extends BaseResponseDto {
  code: string;
  name: string;
  floor: number;
  building: number;
  capacity: number;
  area: number;
  type: RoomType;
}
