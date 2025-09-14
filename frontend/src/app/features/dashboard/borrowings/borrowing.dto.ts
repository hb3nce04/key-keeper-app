import {KeyDto} from '../keys/key.dto';
import {BorrowingStatus} from './borrowing.enum';

export interface BorrowingDto {
  startTime: Date;
  endTime: Date;
  date: Date;
  status: BorrowingStatus;
  key: KeyDto
}
