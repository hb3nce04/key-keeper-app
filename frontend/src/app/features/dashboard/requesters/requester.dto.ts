import {RequesterType} from './requester.enum';

export interface RequesterDto {
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  emailAddress: string;
  phoneNumber: string;
  type: RequesterType
}
