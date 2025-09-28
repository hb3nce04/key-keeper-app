import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {RoomResponseDto} from '../../rooms/dtos/room-response.dto';
import {KeyStatus} from '../enums/key.enum';

export interface KeyResponseDto extends BaseResponseDto {
  code: string;
  room: RoomResponseDto,
  status: KeyStatus;
}
