import {RequesterType} from '../enums/requester.enum';

export interface RequesterRequestDto {
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  emailAddress: string;
  phoneNumber: string;
  type: RequesterType
}
