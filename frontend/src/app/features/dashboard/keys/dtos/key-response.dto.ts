import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {RoomResponseDto} from '../../rooms/dtos/room-response.dto';

export interface KeyResponseDto extends BaseResponseDto {
  code: string;
  room: RoomResponseDto
}
