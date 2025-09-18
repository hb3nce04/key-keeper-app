import {KeyDto} from '../keys/key.dto';
import {BorrowingStatus} from './borrowing.enum';
import {BaseDto} from '../../../core/dtos/base.dto';

export interface BorrowingDto extends BaseDto {
  startTime: Date;
  endTime: Date;
  date: Date;
  status: BorrowingStatus;
  key: KeyDto
}
