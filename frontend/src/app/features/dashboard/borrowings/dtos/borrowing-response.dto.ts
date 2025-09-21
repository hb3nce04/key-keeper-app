import {KeyRequestDto} from '../../keys/dtos/key-request.dto';
import {BorrowingStatus} from '../enums/borrowing.enum';
import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {RequesterRequestDto} from '../../requesters/dtos/requester-request.dto';

export interface BorrowingResponseDto extends BaseResponseDto {
  startTime: Date;
  endTime: Date;
  date: Date;
  status: BorrowingStatus;
  key: KeyRequestDto
  requester: RequesterRequestDto;
}
