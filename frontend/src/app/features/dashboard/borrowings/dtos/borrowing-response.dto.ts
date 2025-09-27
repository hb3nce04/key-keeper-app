import {BorrowingStatus} from '../enums/borrowing.enum';
import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {KeyResponseDto} from '../../keys/dtos/key-response.dto';
import {RequesterResponseDto} from '../../requesters/dtos/requester.response.dto';

export interface BorrowingResponseDto extends BaseResponseDto {
  startTime: string;
  endTime: string;
  date: Date;
  status: BorrowingStatus;
  key: KeyResponseDto
  requester: RequesterResponseDto;
}
