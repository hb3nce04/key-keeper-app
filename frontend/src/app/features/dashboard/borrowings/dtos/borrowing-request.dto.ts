import {BorrowingStatus} from '../enums/borrowing.enum';

export interface BorrowingRequestDto{
  startTime: string;
  endTime: string;
  date: Date;
  status: BorrowingStatus;
  keyId: number
  requesterId: number;
}
