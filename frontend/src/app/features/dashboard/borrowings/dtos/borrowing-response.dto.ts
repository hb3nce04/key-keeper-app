import {BorrowingStatus} from '../enums/borrowing.enum';
import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {RequesterRequestDto} from '../../requesters/dtos/requester-request.dto';
import {KeyResponseDto} from '../../keys/dtos/key-response.dto';

export interface BorrowingResponseDto extends BaseResponseDto {
  startTime: Date;
  endTime: Date;
  date: Date;
  status: BorrowingStatus;
  key: KeyResponseDto
  requester: RequesterRequestDto;
}
